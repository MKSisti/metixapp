export default {
  getAllGroups(state) {
    return state.groups;
  },
  getGroup: (state) => (gid) => {
    var g = state.groups.find((group) => group.id == gid);
    if (g) {
      return g;
    } else return null;
  },
  getGroupDefaults: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.defaults) {
        return g.defaults;
      } else return undefined;
    }
  },
  getGroupStudents: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.students) {
        return g.students.length > 0 ? g.students : null;
      } else return undefined;
    }
  },
  getGroupModules: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.modules) {
        return g.modules.length > 0 ? g.modules : null;
      } else return undefined;
    }
  },
  getModuleTests: (_, getters) => (gid, mid) => {
    var g = getters.getGroup(gid);
    // console.log(g.tests.length);
    if (g.tests) {
      // console.log("inside");
      var tests = g.tests.filter((test) => test.module == mid);
      // console.log(tests);
      return tests.length > 0 ? tests : null;
    } else return undefined;
  },
};
