import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line no-unused-vars
import localForage from "localforage";

export default {
  // store init
  async initStore({ state, commit }) {
    if (state.groups.length == 0) {

      let tmpState = [];
      let tmpGrp = {};
      let tmpModules = [];
      let tmpTests = [];
      let tmpStudents = [];

      let keys = await localForage.keys();
      for (const key of keys) {
        if (key.includes("group_")) {
          tmpGrp = JSON.parse(await localForage.getItem(key));

          for (const modId of Object.keys(tmpGrp.modules)) {
            tmpModules.push(JSON.parse(await localForage.getItem(modId)));
            tmpModules[0].tests = [...Object.keys(tmpModules[0].tests)];
            tmpModules[0].tests = tmpModules[0].tests.map((testId) => testId.split('_')[1]);
          }

          for (const testId of Object.keys(tmpGrp.tests)) {
            tmpTests.push(JSON.parse(await localForage.getItem(testId)));
          }

          for (const stId of Object.keys(tmpGrp.students)) {
            tmpStudents.push(JSON.parse(await localForage.getItem(stId)));
          }

          tmpGrp.modules = tmpModules;
          tmpGrp.tests = tmpTests;
          tmpGrp.students = tmpStudents;
          tmpState.push(tmpGrp);
          // bug fixed: 😏
          tmpModules = [];
          tmpTests = [];
          tmpStudents = [];
        }
      }
      
      // console.log(tmpState);

      tmpState.length > 0 ? commit("init", tmpState) : null;

      // console.log(state);
    }
  },
  // general actions
  generalDelete({ dispatch }, payload) {
    switch (payload.forWhat) {
      case "student":
        console.log("should delete a student");
        dispatch({
          type: "removeStudent",
          id: payload.id,
          sid: payload.sid
        });
        break;
      case "test":
        console.log("should delete a test");
        dispatch({
          type: "removeTest",
          gid: payload.gid,
          tid: payload.tid,
          mid: payload.mid
        });
        break;

      default:
        console.warn("unsupported delete");
        break;
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
      defaults: payload.defaults
    };
    commit({
      type: "addGroup",
      group: newGrp
    });

    let copyGrp = Object.assign({}, newGrp);
    copyGrp.modules = {};
    copyGrp.tests = {};
    copyGrp.students = {};
    //create group in localStorage
    await localForage.setItem("group_" + newGrp.id, JSON.stringify(copyGrp));

    //push group id to localStorage
    let groupIds = (await localForage.getItem("groupIds")) || [];
    groupIds.push("group_" + copyGrp.id);
    await localForage.setItem("groupIds", groupIds);
  },
  async changeGrpName({ commit }, payload) {
    commit({
      type: "updateGroupName",
      id: payload.id,
      name: payload.name
    });

    //get group from localForage and modify name
    let grp = JSON.parse(await localForage.getItem("group_" + payload.id));
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
      cne: payload.cne
    };
    commit({
      type: "addStudentToGrp",
      student: newSt,
      id: payload.id
    });

    //get group and push student
    let grp = JSON.parse(await localForage.getItem("group_" + payload.id));
    grp.students["student_" + newSt.id] = 1;

    //overwrite group with new student ID array
    await localForage.setItem("group_" + grp.id, JSON.stringify(grp));
    await localForage.setItem("student_" + newSt.id, JSON.stringify(newSt));
  },
  async removeStudent({ commit }, payload) {
    commit({
      type: "removeStudentFromGrp",
      id: payload.id,
      sid: payload.sid
    });

    //get group and remove student
    let grp = JSON.parse(await localForage.getItem("group_" + payload.id));
    delete grp.students["student_" + payload.sid];

    //overwrite group with new student id array
    await localForage.setItem("group_" + payload.id, JSON.stringify(grp));

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
      cin: payload.cin
    };

    commit({
      type: "updateStudentData",
      sid: payload.sid,
      gid: payload.gid,
      ...updatedSt
    });

    //overwrite student with new fields
    await localForage.setItem(
      "student_" + payload.sid,
      JSON.stringify(updatedSt)
    );
  },
  async updateAllStNotes({ commit, getters }, payload) {
    commit({
      type: "updateAllStudentNotes",
      gid: payload.gid,
      sid: payload.sid,
      cne: payload.cne,
      fullName: payload.fullName
    });

    let tests = getters.getGroupTests();
    for (let test in tests) {
      await localForage.setItem("test_" + test.id, JSON.stringify(test));
    }
  },
  // general Module CRUD
  async addModule({ commit }, payload) {
    var newMod = {
      id: uuidv4(),
      name: payload.name,
      tests: [],
      testCounter: 0
    };
    commit({
      type: "addModuleToGrp",
      module: newMod,
      id: payload.id
    });

    let copyMod = Object.assign({}, newMod);
    copyMod.tests = {};

    //get group and push mod id
    let grp = JSON.parse(await localForage.getItem("group_" + payload.id));
    grp.modules["module_" + copyMod.id] = 1;

    //overwrite group with new mod ID array and create module
    await localForage.setItem("group_" + grp.id, JSON.stringify(grp));
    await localForage.setItem("module_" + copyMod.id, JSON.stringify(copyMod));
  },
  async updateModName({ commit }, payload) {
    commit({
      type: "updateModuleName",
      gid: payload.gid,
      mid: payload.mid,
      name: payload.name
    });
    let updatedMod = JSON.parse(
      await localForage.getItem("module_" + payload.mid)
    );
    updatedMod.name = payload.name;

    //overwrite module with new name
    await localForage.setItem(
      "module_" + updatedMod.id,
      JSON.stringify(updatedMod)
    );
  },
  // general Test CRUD
  async addTest({ commit, getters }, payload) {
    var testNumber = getters.getModuleInfo(payload.gid, payload.mid)
      .testCounter;
    var students = getters.getGroupStudents(payload.gid);
    var groupDefaults = getters.getGroupDefaults(payload.gid);
    // var moduleInfo = getters.getModuleInfo(payload.gid, payload.mid);
    var notes = {};
    students.forEach(student => {
      notes[student.id] = {
        cne: student.cne,
        fullName: student.fullName,
        value: groupDefaults.validation
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
      test: newTest
    });

    let updatedMod = JSON.parse(
      await localForage.getItem("module_" + payload.mid)
    );
    updatedMod.tests["test_" + newTest.id] = 1;

    let updatedGrp = JSON.parse(
      await localForage.getItem("group_" + payload.gid)
    );
    updatedGrp.tests["test_" + newTest.id] = 1;
    //create test
    await localForage.setItem("test_" + newTest.id, JSON.stringify(newTest));
    await localForage.setItem(
      "module_" + updatedMod.id,
      JSON.stringify(updatedMod)
    );
    await localForage.setItem(
      "group_" + updatedGrp.id,
      JSON.stringify(updatedGrp)
    );
  },
  async updateNote({ commit }, payload) {
    commit({
      type: "updateStudentNote",
      gid: payload.gid,
      tid: payload.tid,
      sid: payload.sid,
      value: payload.value
    });

    let updatedTest = JSON.parse(
      await localForage.getItem("test_" + payload.tid)
    );

    updatedTest.notes[payload.sid].value = payload.value;

    await localForage.setItem(
      "test_" + payload.tid,
      JSON.stringify(updatedTest)
    );
  },
  async removeTest({ commit }, payload) {
    commit({
      type: "removeTestFromGrp",
      gid: payload.gid,
      tid: payload.tid,
      mid: payload.mid
    });

    let updatedMod = JSON.parse(
      await localForage.getItem("module_" + payload.mid)
    );
    delete updatedMod.tests["test_" + payload.tid];

    let updatedGrp = JSON.parse(
      await localForage.getItem("group_" + payload.gid)
    );
    delete updatedGrp.tests["test_" + payload.tid];

    //create test
    await localForage.removeItem("test_" + payload.tid);
    await localForage.setItem(
      "module_" + updatedMod.id,
      JSON.stringify(updatedMod)
    );
    await localForage.setItem(
      "group_" + updatedGrp.id,
      JSON.stringify(updatedGrp)
    );
  }
};
