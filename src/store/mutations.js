export default {
  addGroup(state, payload) {
    state.groups.push(payload.group);
  },
  addStudentToGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].students.push(payload.student);
      }
    }
  },
  removeStudentFromGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        for (let j = 0; j < state.groups[i].students.length; j++) {
          if (state.groups[i].students[j].cne == payload.cne) {
            state.groups[i].students.splice(j, 1);
          }
        }
      }
    }
  },
  addModuleToGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].modules.push(payload.module);
      }
    }
  },
  addTestToGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].tests.push(payload.test);
        for (let j = 0; j < state.groups[i].modules.length; j++) {
          if (state.groups[i].modules[j].id == payload.test.module) {
            state.groups[i].modules[j].tests.push(payload.test.name);
          }
        }
      }
    }
  },
};
