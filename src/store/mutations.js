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
