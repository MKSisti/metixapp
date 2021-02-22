import { v4 as uuidv4 } from "uuid";

export default {
  // general actions
  generalDelete({ dispatch }, payload) {
    switch (payload.forWhat) {
      case "student":
        console.log("should delete a student");
        dispatch({
          type: "removeStudent",
          id: payload.id,
          cne: payload.cne,
        });
        break;
      case "test":
        console.log("should delete a test");
        dispatch({
          type: "removeTest",
          gid: payload.gid,
          tid: payload.tid,
          mid: payload.mid,
        });
        break;

      default:
        console.warn("unsupported delete");
        break;
    }
  },
  // general Group CRUD
  createGrp({ commit }, payload) {
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
  },
  changeGrpName({commit},payload){
    commit({
      type:'updateGroupName',
      id:payload.id,
      name:payload.name,
    })
  },
  // general Student CRUD
  addStudent({ commit }, payload) {
    var newSt = {
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
  },
  removeStudent({ commit }, payload) {
    commit({
      type: "removeStudentFromGrp",
      id: payload.id,
      cne: payload.cne,
    });
  },
  updateStudent({ commit }, payload) {
    commit({
      type: "updateStudentData",
      gid: payload.gid,
      cne: payload.cne,
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      cin: payload.cin,
    });
  },
  // general Module CRUD
  addModule({ commit }, payload) {
    var newMod = {
      id: uuidv4(),
      name: payload.name,
      tests: [],
    };
    commit({
      type: "addModuleToGrp",
      module: newMod,
      id: payload.id,
    });
  },
  updateModName({commit},payload){
    commit({
      type:'updateModuleName',
      gid: payload.gid,
      mid: payload.mid,
      name: payload.name,
    })
  },
  // general Test CRUD
  addTest({ commit, getters }, payload) {
    var testNumber = getters.getModuleTests(payload.gid, payload.mid);
    var students = getters.getGroupStudents(payload.gid);
    var groupDefaults = getters.getGroupDefaults(payload.gid);
    // var moduleInfo = getters.getModuleInfo(payload.gid, payload.mid);
    var notes = {};
    students.forEach((student) => {
      notes[student.cne] = {
        sid: student.cne,
        value: groupDefaults.validation,
      };
    });
    var newTest = {
      id: uuidv4(),
      name: "Test_" + (testNumber ? testNumber.length : 0),
      module: payload.mid,
      notes,
    };
    commit({
      type: "addTestToGrp",
      id: payload.gid,
      test: newTest,
    });
  },
  updateNote({ commit }, payload) {
    commit({
      type: "updateStudentNote",
      gid: payload.gid,
      tid: payload.tid,
      sid: payload.sid,
      value: payload.value,
    });
  },
  removeTest({ commit }, payload) {
    commit({
      type: "removeTestFromGrp",
      gid: payload.gid,
      tid: payload.tid,
      mid: payload.mid,
    });
  },
};
