export default {
  /**
   * 
   * @param state
   * @returns an array with all the groups
   */
  getAllGroups(state) {
    return state.groups;
  },
  /**
   * 
   * @param gid
   * @returns the group with id == `gid`
   */
  getGroup: (state) => (gid) => {
    var g = state.groups.find((group) => group.id == gid);
    if (g) {
      return g;
    } else return null;
  },
  /**
   * 
   * @param gid
   * @returns some group metadata
   */
  getGroupMeta: (_,getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      return {
        name: g.name,
        def: g.defaults,
        desc: g.desc,
      }
    }else return null;
  },
  /**
   * 
   * @param gid
   * @returns the default values for notes for the group with id == `gid`
   */
  getGroupDefaults: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.defaults) {
        return g.defaults;
      } else return undefined;
    }
  },
  /**
   * 
   * @param gid 
   * @returns an Array of students of the group with id == `id`
   */
  getGroupStudents: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.students) {
        return g.students.length > 0 ? g.students : null;
      } else return undefined;
    }
  },
  /**
   * 
   * @param gid
   * @returns an Array of the group with id ==`gid` modules
   */
  getGroupModules: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.modules) {
        return g.modules.length > 0 ? g.modules : null;
      } else return undefined;
    }
  },
  /**
   * 
   * @param gid group id
   * @param mid module id
   * @returns an Array of tests of the specified module ( with id == mid inside a group with id == gid)
   */
  getModuleTests: (_, getters) => (gid, mid) => {
    var g = getters.getGroup(gid);
    if (g?.tests) {
      var tests = g.tests.filter((test) => test.module == mid);
      return tests.length > 0 ? tests : null;
    } else return undefined;
  },
  /**
   * 
   * @param gid
   * @param mid
   * @returns some module metadata
   */
  getModuleInfo: (_, getters) => (gid, mid) => {
    var g = getters.getGroup(gid);
    if (g) {
      if (g.modules) {
        var mod = g.modules.find((module) => module.id == mid);
        if (mod) {
          return {
            moduleName: mod.name,
            groupName: g.name,
            testCounter: mod.testCounter,
          };
        }
      }
    } else return undefined;
  },
  /**
   * 
   * @param gid
   * @returns an Array of all the tests passed for a specified group
   */
  getGroupTests: (_, getters) => (gid) => {
    var g = getters.getGroup(gid);
    return g?.tests.length > 0 ? g.tests : null;
  },

  /**
   * * getters for Analytics Page
   */
  

  
};
