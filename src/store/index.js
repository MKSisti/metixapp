import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const store = createStore({
  state() {
    return {
      groups: [
        {
          id: "-Mshauw152",
          name: "GINF1",
          desc: "some description here (⌐■_■)👌",
          modules: [
            {
              id: "-OIkH99",
              name: "mod1",
              tests: ["test1", "test2"],
            },
            {
              id: "-PIpik99",
              name: "mod2",
              tests: [],
            },
          ],
          tests: [
            {
              id: "-SUmBSF26",
              name: "test1",
              date: "14-02-2021",
              module: "-OIkH99",
              notes: [
                {
                  "A69-9863857": 12,
                },
                { "B63-4559541": 10.5 },
                { "F03-4806034": 13 },
                { "K19-9898753": 16 },
                { "B00-7881956": 9 },
              ],
            },
            {
              id: "-LLKAKW66",
              name: "test2",
              date: "1-02-2021",
              module: "-OIkH99",
              notes: [
                { "A69-9863857": 13 },
                { "B63-4559541": 11.5 },
                { "F03-4806034": 15 },
                { "K19-9898753": 13 },
                { "B00-7881956": 11 },
              ],
            },
          ],
          students: [
            {
              first_name: "Julina",
              last_name: "Broadnicke",
              email: "jbroadnicke0@webs.com",
              cin: "A69-9863857",
              cne: "35-2350131",
              phone: "0690340816",
            },
            {
              first_name: "Olga",
              last_name: "Peacham",
              email: "opeacham1@va.gov",
              cin: "B63-4559541",
              cne: "44-2617726",
              phone: "0650689668",
            },
            {
              first_name: "Stirling",
              last_name: "Phlippi",
              email: "sphlippi2@utexas.edu",
              cin: "F03-4806034",
              cne: "65-1775433",
              phone: "0677298497",
            },
            {
              first_name: "Eula",
              last_name: "McClure",
              email: "emcclure3@mapy.cz",
              cin: "K19-9898753",
              cne: "51-2983176",
              phone: "0662121375",
            },
            {
              first_name: "Fonsie",
              last_name: "Terrill",
              email: "fterrill4@smh.com.au",
              cin: "B00-7881956",
              cne: "38-0600278",
              phone: "0640562749",
            },
          ],
        },
        {
          id: "-Mtsdauw992",
          name: "GINF2",
          desc: "a cooler description here (☞ﾟヮﾟ)☞",
          modules: [
            {
              id: "-OPLAYGW69",
              name: "some module",
              tests: ["test1"],
            },
          ],
          tests: [
            {
              id: "-SDJKW26",
              name: "test1",
              date: "14-02-2021",
              module: "-OPLAYGW69",
              notes: [
                {
                  "33-7460157": 19,
                },
                { "38-9897358": 13.5 },
                { "51-5401377": 2 },
              ],
            },
          ],
          students: [
            {
              first_name: "Calley",
              last_name: "Paulack",
              email: "cpaulack0@hp.com",
              cin: "33-7460157",
              cne: "82-6532928",
              phone: "062187322734",
            },
            {
              first_name: "Pierce",
              last_name: "Tompsett",
              email: "ptompsett1@va.gov",
              cin: "38-9897358",
              cne: "37-8463600",
              phone: "064489832835",
            },
            {
              first_name: "Adelheid",
              last_name: "Hallatt",
              email: "ahallatt2@tumblr.com",
              cin: "51-5401377",
              cne: "54-5843346",
              phone: "068009432519",
            },
          ],
        },
      ],
    };
  },
  actions,
  mutations,
  getters,
});

export default store;
