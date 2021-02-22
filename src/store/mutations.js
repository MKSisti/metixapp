export default {
  // group mutations
  addGroup(state, payload) {
    state.groups.push(payload.group);
  },
  updateGroupName(state, payload){
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].name = payload.name;
      }
      
    }
  },
  // student mutations
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
  updateStudentData(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.gid) {
        for (let j = 0; j < state.groups[i].students.length; j++) {
          if (state.groups[i].students[j].cne == payload.cne) {
            state.groups[i].students[j].fullName = payload.fullName;
            state.groups[i].students[j].email = payload.email;
            state.groups[i].students[j].phone = payload.phone;
            state.groups[i].students[j].cin = payload.cin;
          }
        }
      }
    }
  },
  // module mutations
  addModuleToGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].modules.push(payload.module);
      }
    }
  },
  updateModuleName(state, payload){
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.gid) {
        for (let j = 0; j < state.groups[i].modules.length; j++) {
          if (state.groups[i].modules[j].id == payload.mid) {
            state.groups[i].modules[j].name = payload.name;
          }
          
        }
      }
    }
  },
  // test mutations
  addTestToGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].tests.push(payload.test);
        for (let j = 0; j < state.groups[i].modules.length; j++) {
          if (state.groups[i].modules[j].id == payload.test.module) {
            state.groups[i].modules[j].tests.push(payload.test.id);
          }
        }
      }
    }
  },
  removeTestFromGrp(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.gid) {
        for (let j = 0; j < state.groups[i].tests.length; j++) {
          if (state.groups[i].tests[j].id == payload.tid) {
            state.groups[i].tests.splice(j, 1);
          }
        }
        for (let j = 0; j < state.groups[i].modules.length; j++) {
          if (state.groups[i].modules[j].id == payload.mid) {
            state.groups[i].modules[j].tests = state.groups[i].modules[
              j
            ].tests.filter((test) => test.id != payload.tid);
          }
        }
      }
    }
  },
  // notes mutations
  updateStudentNote(state, payload) {
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.gid) {
        for (let j = 0; j < state.groups[i].tests.length; j++) {
          if (state.groups[i].tests[j].id == payload.tid) {
            state.groups[i].tests[j].notes[payload.sid].value = payload.value;
          }
        }
      }
    }
  },
};
