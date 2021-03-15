<template>
  <base-body :key="GroupId" class="capitalize overflow-hidden transition duration-200 transform-gpu">
    <template v-slot:title>
      <!-- group name -->
      <!-- <div class="w-full flex justify-start items-center flex-row h-full pl-10 pt-4" v-if="!editMode">
        <h1 class="text-4xl font-bold">{{ group?.name }}</h1>
        <span @click="editMode = true" class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="pencil" type="solid" size="cssSize" class="w-8 h-8 fill-current mt-1" v-pre></box-icon>
        </span>
      </div> -->

      <!-- group edit, on when edit is clicked -->
      <div @keyup.enter="updateGrpName" class="w-full flex justify-start items-center flex-row h-full pl-10 pt-4">
        <input @change="newGrpName = $event.target.value" ref="editInput" :value="group?.name " type="text" class="py-2 h-14 bg-transparent border-2  hover:border-black-light-15 focus:border-black-light-15 border-transparent focus:outline-none text-4xl font-bold transition duration-200 -ml-3 pl-3 capitalize"/>
        <!-- <span @click="updateGrpName" class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base">
          <box-icon name="check" size="cssSize" class="w-12 h-12 fill-current" v-pre></box-icon>
        </span> -->
      </div>
    </template>

    <template v-slot:subtitles>
      <h1 class="pl-10 pt-2">{{ group?.desc}}</h1>
    </template>

    <template v-slot:topRight>
      <div class="space-y-2 pt-4 w-full flex justify-center items-end flex-col">
        <div @click="goToAnalytics" class="bg-blue-base px-4 py-2 text-xl text-black-base cursor-pointer flex justify-center items-center w-36 hover:w-40 transition-all duration-200">
          <h1 class="text-black-base pr-2">Analytics</h1>
          <box-icon name="bar-chart-alt-2" type="solid" size="cssSize" class="w-6 h-6 fill-current" v-pre></box-icon>
        </div>

        <div @click="goToEdit" class="bg-blue-base px-4 py-2 text-xl text-black-base cursor-pointer w-36 hover:w-40 transition-all duration-200">
          Edit Group
        </div>
      </div>
    </template>

    <template v-slot:content>
      <div class="w-full h-full pt-28 flex flex-col justify-start items-start space-y-2 px-3 overflow-y-auto overflow-x-hidden">
        <!-- new student, adds an empty student or template student with edit flag true -->
        <div class="bg-black-light-1 flex justify-between items-center flex-row w-64 h-16 p-4">
          <h1 class="text-2xl capitalize font-bold">new Student</h1>
          <span @click="toggleShowAddStudent" class="cursor-pointer hover:text-blue-light-1 text-3xl font-bold bg-black-light-5 text-blue-base w-9 h-9 flex justify-center items-center p-px">
            <box-icon name="plus" size="cssSize" class="w-full h-full fill-current" v-pre></box-icon>
          </span>
        </div>
        <!-- student display loop -->
        <div class="w-full relative">
          <transition-group @before-leave="beforeLeave" name="fade-x" appear>
            <div @keyup.enter="addNewSt" v-if="ShowAddStudent" key="student input" class="bg-black-light-1 flex justify-between items-center flex-col w-full h-64 relative pb-1 flex-none transition-all duration-200 transform-gpu mt-2">
              <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
              <h1 v-if="group?.students.length < 1" class="text-xl capitalize absolute top-2 left-2 font-bold">
                Add your first student
              </h1>
              <h1 class="text-xl capitalize absolute top-2 left-2 font-bold" v-else>
                Add a new student
              </h1>
              <!-- close btn -->
              <div class="w-full p-2">
                <span @click="ShowAddStudent = false" class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right">
                  <box-icon name="plus" size="cssSize" class="w-full h-full fill-current transform rotate-45 scale-105" v-pre></box-icon>
                </span>
              </div>

              <!-- student add form -->
              <div class="w-full relative">
                <div class="w-full flex justify-around items-center flex-row -mt-6 space-x-4 px-8">
                  <base-input v-model="newStFullName" name="student full name *" type="text" tmp="First Last Jr." maxLen="32" :error="newStFullNameErr" focus="true"></base-input>
                  <base-input v-model="newStEmail" name="student email *" type="text" tmp="example@email.com" maxLen="32" :error="newStEmailErr"></base-input>
                  <base-input v-model="newStPhone" name="student phone *" type="text" tmp="(+212)-12345678" maxLen="32" :error="newStPhoneErr"></base-input>
                  <base-input v-model="newStCne" name="student cne *" type="text" tmp="XY123456" maxLen="32" :error="newStCneErr"></base-input>
                  <base-input v-model="newStCin" name="student cin" type="text" tmp="XY12345" maxLen="32"></base-input>
                </div>
              </div>

              <!-- done button -->
              <div class="flex justify-center items-center flex-row cursor-pointer">
                <button @click="addNewSt" class="capitalize rounded-none bg-blue-base px-6 py-1.5 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition-all duration-200">
                  done
                </button>
              </div>
            </div>
            <base-student class="transition-all duration-200 transform-gpu my-2" @remove="deleteSt" v-for="student in group?.students || []" :key="student.cne" :student="student" :gid="GroupId" />
          </transition-group>
        </div>
      </div>
    </template>
  </base-body>
</template>

<script>
  import BaseInput from '../components/BaseComponent/BaseInput';
  import BaseBody from '../components/BaseComponent/BaseBody';
  import BaseStudent from '../components/BaseComponent/BaseStudent';
  import { mapActions } from 'vuex';
  // import BaseStudent from "../components/BaseComponent/BaseStudent.vue";

  // import { Getter } from "vuex";
  // import BaseInput from '../components/BaseComponent/BaseInput.vue';

  export default {
    name: 'SingleGroup',
    components: { BaseBody, BaseStudent, BaseInput },
    props: ['GroupId'],
    inject: ['pushPopup'],
    data() {
      return {
        newGrpName: null,
        editMode: false,
        ShowAddStudent: false,
        newStFullName: '',
        newStFullNameErr: null,
        newStEmail: '',
        newStEmailErr: null,
        newStPhone: '',
        newStPhoneErr: null,
        newStCne: '',
        newStCneErr: null,
        newStCin: '',
      };
    },
    computed: {
      group() {
        return this.$store.getters.getGroup(this.GroupId);
      },
    },
    methods: {
      ...mapActions(['addStudent', 'removeStudent', 'changeGrpName']),
      toggleShowAddStudent() {
        this.ShowAddStudent = !this.ShowAddStudent;
      },
      updateGrpName() {
        if (this.newGrpName?.length > 0) {
          this.changeGrpName({
            id: this.GroupId,
            name: this.newGrpName,
          });
        }
        this.editMode = false;
        document.documentElement.focus();
      },
      test() {
        var phoneTest = /^(\+212|0)(\d){9}$/;
        var emailTest = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

        var errs = {
          name: this.newStFullName.length > 0,
          email: emailTest.test(this.newStEmail),
          phone: phoneTest.test(this.newStPhone),
          cne: this.newStCne.length > 0,
          // cin: this.newStCin.length > 0, //field is not required
        };
        return errs;
      },
      addNewSt() {
        var errs = this.test();
        this.newStFullNameErr = errs.name ? null : 'required Field';
        this.newStEmailErr = errs.email ? null : 'invalid email';
        this.newStPhoneErr = errs.phone ? null : 'invalid phone number';
        this.newStCneErr = errs.cne ? null : 'required Field';
        if (errs.name && errs.email && errs.phone && errs.cne) {
          this.addStudent({
            id: this.GroupId,
            fullName: this.newStFullName,
            email: this.newStEmail,
            phone: this.newStPhone,
            cne: this.newStCne,
            cin: this.newStCin,
          });
          this.newStFullName = '';
          this.newStEmail = '';
          this.newStPhone = '';
          this.newStCne = '';
          this.newStCin = '';
        }
      },
      deleteSt(sid) {
        // this.removeStudent({
        //   cne: cne,
        //   id: this.GroupId,
        // });
        this.pushPopup({
          forWhat: 'student',
          sid: sid,
          id: this.GroupId,
        });
      },
      goToEdit(){
        this.$router.push({ name: 'groupEdit', params: { GroupId: this.GroupId } });
      },
      goToAnalytics(){
        this.$router.push({ name: 'groupAnalytics', params: { GroupId: this.GroupId } });
      }
    },
  };
</script>
