export default {
  // store init
  init(state,payload){
    state.groups = payload;
  },
  // group mutations
  addGroup(state, payload) {
    state.groups.push(payload.group);
  },
  removeGroup(state, payload){
    state.groups.splice(state.groups.findIndex(gr => gr.id == payload.id), 1);
  },
  updateGroupName(state, payload){
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].name = payload.name;
      }
      
    }
  },
  updateGroupData(state, payload){
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        state.groups[i].name = payload.name;
        state.groups[i].desc = payload.desc;
        state.groups[i].defaults = payload.defaults;
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
          if (state.groups[i].students[j].id == payload.sid) {
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
          if (state.groups[i].students[j].id == payload.sid) {
            state.groups[i].students[j].fullName = payload.fullName;
            state.groups[i].students[j].email = payload.email;
            state.groups[i].students[j].phone = payload.phone;
            state.groups[i].students[j].cin = payload.cin;
            state.groups[i].students[j].cne = payload.cne;
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
  removeModuleFromGrp(state, payload){
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.id) {
        for (let j = 0; j < state.groups[i].modules.length; j++) {
          if (state.groups[i].modules[j].id == payload.mid) {
            state.groups[i].modules.splice(j,1);
          }
          
        }
        for (let j = 0; j < state.groups[i].tests.length; j++) {
          if (state.groups[i].tests[j].module == payload.mid) {
            state.groups[i].tests.splice(j, 1);
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
            state.groups[i].modules[j].testCounter++
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
            state.groups[i].modules[j].tests.length == 0 ? state.groups[i].modules[j].testCounter =  0 : null;
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
  updateAllStudentNotes(state, payload){
    console.log('is calling update all notes');
    for (let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].id == payload.gid) {
        for (let j = 0; j < state.groups[i].tests.length; j++) {
          if (state.groups[i].tests[j].notes?.[payload.sid]) {
            console.log('found One');
            state.groups[i].tests[j].notes[payload.sid].fullName = payload.fullName;
            state.groups[i].tests[j].notes[payload.sid].cne = payload.cne;

          }
        }
      }
    }
  }
};
