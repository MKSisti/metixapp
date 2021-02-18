import { v4 as uuidv4 } from "uuid";

export default {
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
};
