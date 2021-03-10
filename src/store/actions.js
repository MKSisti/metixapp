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
          sid: payload.sid,
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
  },
  removeStudent({ commit }, payload) {
    commit({
      type: "removeStudentFromGrp",
      id: payload.id,
      sid: payload.sid,
    });
  },
  updateStudent({ commit }, payload) {
    commit({
      type: "updateStudentData",
      sid: payload.sid,
      gid: payload.gid,
      cne: payload.cne,
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      cin: payload.cin,
    });
  },
  updateAllStNotes({ commit }, payload){
    commit({
      type: "updateAllStudentNotes",
      gid: payload.gid,
      sid: payload.sid,
      cne: payload.cne,
      fullName: payload.fullName,
    })
  },
  // general Module CRUD
  addModule({ commit }, payload) {
    var newMod = {
      id: uuidv4(),
      name: payload.name,
      tests: [],
      testCounter: 0
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
    var testNumber = getters.getModuleInfo(payload.gid, payload.mid).testCounter;
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
