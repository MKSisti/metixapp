import { v4 as uuidv4 } from "uuid";

export default {
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
  addStudent({ commit }, payload) {
    var newSt = {
      firstName: payload.fname,
      lastName: payload.lname,
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
