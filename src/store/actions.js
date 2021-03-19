import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line no-unused-vars
import localForage from "localforage";

Math.avg = (...arr) => {
  let sum = 0;
  arr.forEach((n) => {
    sum += n * 1;
  });
  return (sum / arr.length).toFixed(2) * 1;
};
Math.countMoreThan = (n, ...arr) => {
  return arr.filter((i) => i >= n).length;
};
Math.countLessThan = (n, ...arr) => {
  return arr.filter((i) => i < n).length;
};

export default {
  // store init
  async initStore({ state, commit }) {
    if (state.groups.length == 0) {
      let tmpState = [];
      let tmpGrp = {};
      let tmpModules = [];
      let tmpTests = [];
      let tmpStudents = [];
      let idx = 0;
      let keys = await localForage.keys();
      for (const key of keys) {
        if (key.includes("group_")) {
          tmpGrp = await localForage.getItem(key);
          for (const modId of Object.keys(tmpGrp.modules)) {
            tmpModules.push(await localForage.getItem(modId));

            tmpModules[tmpModules.length - 1].tests = [...Object.keys(tmpModules[tmpModules.length - 1].tests)];
            tmpModules[tmpModules.length - 1].tests = tmpModules[tmpModules.length - 1].tests.map((testId) => testId.split("_")[1]);
          }

          for (const testId of Object.keys(tmpGrp.tests)) {
            tmpTests.push(await localForage.getItem(testId));
          }

          for (const stId of Object.keys(tmpGrp.students)) {
            tmpStudents.push(await localForage.getItem(stId));
          }

          tmpGrp.modules = tmpModules;
          tmpGrp.tests = tmpTests;
          tmpGrp.students = tmpStudents;
          tmpState.push(tmpGrp);
          state.groupsMap[tmpGrp.id] = idx++;
          
          tmpModules = [];
          tmpTests = [];
          tmpStudents = [];
        }
      }

      tmpState.length > 0 ? commit("init", tmpState) : null;

      // console.log(state);
    }
  },
  // general actions
  generalDelete({ dispatch }, payload) {
    switch (payload.forWhat) {
      case "group":
        console.log("should delete a group");
        dispatch({
          type: "deleteGrp",
          id: payload.gid,
        });
        return Date.now();
      case "student":
        console.log("should delete a student");
        dispatch({
          type: "removeStudent",
          id: payload.id,
          sid: payload.sid,
        });
        return Date.now();
      case "test":
        console.log("should delete a test");
        dispatch({
          type: "removeTest",
          gid: payload.gid,
          tid: payload.tid,
          mid: payload.mid,
        });
        return Date.now();
      case "module":
        console.log("should delete a module");
        dispatch({
          type: "deleteMod",
          id: payload.id,
          mid: payload.mid,
        });
        return Date.now();

      default:
        console.warn("unsupported delete");
        return null;
    }
  },
  // general Group CRUD
  async createGrp({ commit }, payload) {
    var newGrp = {
      id: uuidv4(),
      name: payload.name,
      desc: payload.desc,
      modules: [],
      tests: [],
      students: [],
      defaults: payload.defaults,
    };
    commit({
      type: "addGroup",
      group: newGrp,
    });

    let copyGrp = Object.assign({}, newGrp);
    copyGrp.modules = {};
    copyGrp.tests = {};
    copyGrp.students = {};
    //create group in localStorage
    await localForage.setItem("group_" + newGrp.id, copyGrp);

    //push group id to localStorage
    let groupIds = (await localForage.getItem("groupIds")) || [];
    groupIds.push("group_" + copyGrp.id);
    await localForage.setItem("groupIds", groupIds);
  },
  async updateGrp({ commit }, payload) {
    commit({
      type: "updateGroupData",
      id: payload.id,
      name: payload.name,
      desc: payload.desc,
      defaults: payload.defaults,
    });

    let grp = await localForage.getItem("group_" + payload.id);
    grp.defaults = payload.defaults;
    grp.desc = payload.desc;
    grp.name = payload.name;

    await localForage.setItem("group_" + payload.id, grp);

    //todo: LF logic here
  },
  async deleteGrp({ commit }, payload) {
    //your delete logic here
    commit({
      type: "removeGroup",
      id: payload.id,
    });
    //get group from LF
    let grp = await localForage.getItem("group_" + payload.id);

    //get group ids array and remove group from it
    let groupIds = (await localForage.getItem("groupIds")) || [];
    groupIds = groupIds.filter((grpId) => grpId != "group_" + grp.id);
    await localForage.setItem("groupIds", groupIds);

    //remove referenced elements in group from LF
    for (const modId of Object.keys(grp.modules)) {
      await localForage.removeItem(modId);
    }

    for (const testId of Object.keys(grp.tests)) {
      await localForage.removeItem(testId);
    }

    for (const stId of Object.keys(grp.students)) {
      await localForage.removeItem(stId);
    }

    //remove group entry from LF
    await localForage.removeItem("group_" + grp.id);
  },
  async changeGrpName({ commit }, payload) {
    commit({
      type: "updateGroupName",
      id: payload.id,
      name: payload.name,
    });

    //get group from localForage and modify name
    let grp = await localForage.getItem("group_" + payload.id);
    grp.name = payload.name;

    //overwrite group with new name
    await localForage.setItem("group_" + payload.id, grp);
  },
  // general Student CRUD
  async addStudent({ commit }, payload) {
    var newSt = {
      id: uuidv4(),
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      cin: payload.cin,
      cne: payload.cne,
    };
    commit({
      type: "addStudentToGrp",
      student: newSt,
      id: payload.id,
    });

    //get group and push student
    let grp = await localForage.getItem("group_" + payload.id);
    grp.students["student_" + newSt.id] = 1;

    //overwrite group with new student ID array
    await localForage.setItem("group_" + grp.id, grp);
    await localForage.setItem("student_" + newSt.id, newSt);
  },
  async removeStudent({ commit }, payload) {
    commit({
      type: "removeStudentFromGrp",
      id: payload.id,
      sid: payload.sid,
    });

    //get group and remove student
    let grp = await localForage.getItem("group_" + payload.id);
    delete grp.students["student_" + payload.sid];

    //overwrite group with new student id array
    await localForage.setItem("group_" + payload.id, grp);

    //remove student
    await localForage.removeItem("student_" + payload.sid);
  },
  async updateStudent({ commit }, payload) {
    //create student
    let updatedSt = {
      id: payload.sid,
      cne: payload.cne,
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      cin: payload.cin,
    };

    commit({
      type: "updateStudentData",
      sid: payload.sid,
      gid: payload.gid,
      ...updatedSt,
    });

    //overwrite student with new fields
    await localForage.setItem("student_" + payload.sid, updatedSt);
  },
  async updateAllStNotes({ commit, getters }, payload) {
    commit({
      type: "updateAllStudentNotes",
      gid: payload.gid,
      sid: payload.sid,
      cne: payload.cne,
      fullName: payload.fullName,
    });

    let tests = getters.getGroupTests();
    for (let test in tests) {
      await localForage.setItem("test_" + test.id, test);
    }
  },
  // general Module CRUD
  async addModule({ commit }, payload) {
    var newMod = {
      id: uuidv4(),
      name: payload.name,
      tests: [],
      testCounter: 0,
    };
    commit({
      type: "addModuleToGrp",
      module: newMod,
      id: payload.id,
    });

    let copyMod = Object.assign({}, newMod);
    copyMod.tests = {};

    //get group and push mod id
    let grp = await localForage.getItem("group_" + payload.id);
    grp.modules["module_" + copyMod.id] = 1;

    //overwrite group with new mod ID array and create module
    await localForage.setItem("group_" + grp.id, grp);
    await localForage.setItem("module_" + copyMod.id, copyMod);
  },
  async deleteMod({ commit }, payload) {
    //your delete logic here
    commit({
      type: "removeModuleFromGrp",
      id: payload.id,
      mid: payload.mid,
    });
    //read module
    let module = await localForage.getItem("module_" + payload.mid);

    //read group and delete module from group modules
    let grp = await localForage.getItem("group_" + payload.id);
    delete grp.modules["module_" + payload.mid];

    //delete tests
    for (const testId of Object.keys(module.tests)) {
      delete grp.tests[testId];
      await localForage.removeItem(testId);
    }

    //set updated group
    await localForage.setItem("group_" + payload.id, grp);

    //remove module
    await localForage.removeItem("module_" + payload.mid);
  },
  async updateModName({ commit }, payload) {
    commit({
      type: "updateModuleName",
      gid: payload.gid,
      mid: payload.mid,
      name: payload.name,
    });
    let updatedMod = await localForage.getItem("module_" + payload.mid);
    updatedMod.name = payload.name;

    //overwrite module with new name
    await localForage.setItem("module_" + updatedMod.id, updatedMod);
  },
  // general Test CRUD
  async addTest({ commit, getters }, payload) {
    var testNumber = getters.getModuleInfo(payload.gid, payload.mid)
      .testCounter;
    var students = getters.getGroupStudents(payload.gid);
    var groupDefaults = getters.getGroupDefaults(payload.gid);
    // var moduleInfo = getters.getModuleInfo(payload.gid, payload.mid);
    var notes = {};
    students.forEach((student) => {
      notes[student.id] = {
        cne: student.cne,
        fullName: student.fullName,
        value: groupDefaults.validation,
      };
    });
    var newTest = {
      id: uuidv4(),
      name: "Test_" + testNumber,
      module: payload.mid,
      timestamp: Date.now(),
      notes
    };
    commit({
      type: "addTestToGrp",
      id: payload.gid,
      test: newTest,
    });

    let updatedMod = await localForage.getItem("module_" + payload.mid);
    updatedMod.tests["test_" + newTest.id] = 1;
    updatedMod.testCounter++;

    let updatedGrp = await localForage.getItem("group_" + payload.gid);
    updatedGrp.tests["test_" + newTest.id] = 1;
    //create test
    await localForage.setItem("test_" + newTest.id, newTest);
    await localForage.setItem("module_" + updatedMod.id, updatedMod);
    await localForage.setItem("group_" + updatedGrp.id, updatedGrp);
  },
  async updateTestHeight({ commit },payload){
    commit({
      type: "updateTestHeight",
      gid: payload.gid,
      tid: payload.tid,
      height: payload.height,
    });
    let updatedTest = await localForage.getItem("test_" + payload.tid);
    updatedTest.height = payload.height;
    await localForage.setItem("test_" + payload.tid, updatedTest);
  },
  async updateNote({ commit }, payload) {
    commit({
      type: "updateStudentNote",
      gid: payload.gid,
      tid: payload.tid,
      sid: payload.sid,
      value: payload.value,
    });

    let updatedTest = await localForage.getItem("test_" + payload.tid);

    updatedTest.notes[payload.sid].value = payload.value;

    await localForage.setItem("test_" + payload.tid, updatedTest);
  },
  async removeTest({ commit }, payload) {
    commit({
      type: "removeTestFromGrp",
      gid: payload.gid,
      tid: payload.tid,
      mid: payload.mid,
    });

    let updatedMod = await localForage.getItem("module_" + payload.mid);
    delete updatedMod.tests["test_" + payload.tid];
    if (Object.keys(updatedMod.tests).length < 1) updatedMod.testCounter = 0;

    let updatedGrp = await localForage.getItem("group_" + payload.gid);
    delete updatedGrp.tests["test_" + payload.tid];

    //create test
    await localForage.removeItem("test_" + payload.tid);
    await localForage.setItem("module_" + updatedMod.id, updatedMod);
    await localForage.setItem("group_" + updatedGrp.id, updatedGrp);
  },
  async getGroupAnalytics({ getters }, payload) {
    let groupMeta = getters.getGroupMeta(payload.id);
    let modules = getters.getGroupModules(payload.id);
    let tmpNote = [];
    if (modules.length < 1) {
      return null;
    } else {
      let ret = {
        ...groupMeta,
        mods: {},
      };
      for (const mod of modules) {
        let tests = getters.getModuleTests(payload.id, mod.id) ?? [];
        ret.mods[mod.id] = {
          name: mod.name,
          tests: {},
        };
        for (const test of tests) {
          for (const key in test.notes) {
            tmpNote.push(test.notes[key].value);
            // console.log(test.notes[key].value);
          }
          // console.log(tmpNote);
          ret.mods[mod.id].tests[test.id] = {
            name: test.name,
            max: Math.max(...tmpNote),
            min: Math.min(...tmpNote),
            avg: Math.avg(...tmpNote),
          };
          tmpNote = [];
        }
      }
      return ret;
    }
  },
};
