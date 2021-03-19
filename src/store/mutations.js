export default {
  // store init
  init(state, payload) {
    state.groups = payload;
  },
  // group mutations
  addGroup(state, payload) {
    state.groupsMap[payload.group.id] = state.groups.length;
    state.groups.push(payload.group);
  },
  removeGroup(state, payload) {
    let idx = state.groups.findIndex((gr) => gr.id == payload.id);
    delete state.groupsMap[payload.id];
    for (const key in state.groupsMap) {
      state.groupsMap[key] > idx ? state.groupsMap[key]-- : null;
    }
    state.groups.splice(idx, 1);
  },
  updateGroupName(state, payload) {
    state.groups[state.groupsMap[payload.id]].name = payload.name;
  },
  updateGroupData(state, payload) {
    let idx = state.groupsMap[payload.id];
    state.groups[idx].name = payload.name;
    state.groups[idx].desc = payload.desc;
    state.groups[idx].defaults = payload.defaults;
  },
  // student mutations
  addStudentToGrp(state, payload) {
    state.groups[state.groupsMap[payload.id]].students.push(payload.student);
  },
  removeStudentFromGrp(state, payload) {
    let idx = state.groupsMap[payload.id];
    for (let j = 0; j < state.groups[idx].students.length; j++) {
      if (state.groups[idx].students[j].id == payload.sid)
        state.groups[idx].students.splice(j, 1);
    }
  },
  updateStudentData(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].students.length; j++) {
      if (state.groups[idx].students[j].id == payload.sid) {
        state.groups[idx].students[j].fullName = payload.fullName;
        state.groups[idx].students[j].email = payload.email;
        state.groups[idx].students[j].phone = payload.phone;
        state.groups[idx].students[j].cin = payload.cin;
        state.groups[idx].students[j].cne = payload.cne;
      }
    }
  },
  // module mutations
  addModuleToGrp(state, payload) {
    state.groups[state.groupsMap[payload.id]].modules.push(payload.module);
  },
  updateModuleName(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].modules.length; j++) {
      if (state.groups[idx].modules[j].id == payload.mid) {
        state.groups[idx].modules[j].name = payload.name;
      }
    }
  },
  removeModuleFromGrp(state, payload) {
    let idx = state.groupsMap[payload.id];
    for (let j = 0; j < state.groups[idx].modules.length; j++) {
      if (state.groups[idx].modules[j].id == payload.mid) {
        state.groups[idx].modules.splice(j, 1);
      }
    }
    for (let j = 0; j < state.groups[idx].tests.length; j++) {
      if (state.groups[idx].tests[j].module == payload.mid) {
        state.groups[idx].tests.splice(j, 1);
      }
    }
  },
  // test mutations
  addTestToGrp(state, payload) {
    let idx = state.groupsMap[payload.id];
    state.groups[idx].tests.push(payload.test);
    for (let j = 0; j < state.groups[idx].modules.length; j++) {
      if (state.groups[idx].modules[j].id == payload.test.module) {
        state.groups[idx].modules[j].tests.push(payload.test.id);
        state.groups[idx].modules[j].testCounter++;
      }
    }
    // console.log(state.groups);
  },
  removeTestFromGrp(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].tests.length; j++) {
      if (state.groups[idx].tests[j].id == payload.tid) {
        state.groups[idx].tests.splice(j, 1);
      }
    }
    for (let j = 0; j < state.groups[idx].modules.length; j++) {
      if (state.groups[idx].modules[j].id == payload.mid) {
        state.groups[idx].modules[j].tests.splice(
          state.groups[idx].modules[j].tests.find(
            (testId) => testId == payload.tid
          ),
          1
        );
        state.groups[idx].modules[j].tests.length == 0
          ? (state.groups[idx].modules[j].testCounter = 0)
          : null;
      }
    }
  },
  // notes mutations
  updateStudentNote(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].tests.length; j++) {
      if (state.groups[idx].tests[j].id == payload.tid) {
        state.groups[idx].tests[j].notes[payload.sid].value = payload.value;
      }
    }
  },
  updateTestHeight(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].tests.length; j++) {
      if (state.groups[idx].tests[j].id == payload.tid) {
        state.groups[idx].tests[j].height = payload.height;
      }
    }
  },
  updateAllStudentNotes(state, payload) {
    let idx = state.groupsMap[payload.gid];
    for (let j = 0; j < state.groups[idx].tests.length; j++) {
      if (state.groups[idx].tests[j].notes?.[payload.sid]) {
        state.groups[idx].tests[j].notes[payload.sid].fullName =
          payload.fullName;
        state.groups[idx].tests[j].notes[payload.sid].cne = payload.cne;
      }
    }
  },
};
