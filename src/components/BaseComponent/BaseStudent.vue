<template>
  <div
    class="bg-black-light-1 flex justify-between items-center flex-col w-full h-52 relative pb-1 flex-none"
  >
    <!-- cne maybe or uneditable internal id to avoid duplicates maybe using UUID lib -->
    <h1 class="text-base capitalize absolute top-2 left-2">
      {{ student.cne }}
    </h1>

    <!-- close btn -->
    <div @click="removeSt" class="w-full p-2">
      <span
        class="cursor-pointer hover:bg-red-light-1 text-2xl font-bold bg-red-base text-black-light-5 w-9 h-9 flex justify-center items-center float-right"
      >
        <box-icon
          name="plus"
          size="cssSize"
          class="w-full h-full fill-current transform rotate-45 scale-105"
          v-pre
        ></box-icon>
      </span>
    </div>

    <!-- student card body -->
    <div class="w-full relative">
      <!-- data display -->
      <div
        class="w-full flex justify-around items-center flex-row px-10"
        v-if="!isInEditMode"
      >
        <h1 class="text-xl w-full max-w-xs break-words">{{ student.fullName }}</h1>
        <h1 class="text-xl w-full max-w-xs break-words">{{ student.email }}</h1>
        <h1 class="text-xl w-full max-w-xs break-words">{{ student.phone }}</h1>
        <h1 class="text-xl w-full max-w-xs break-words">{{ student.cin != '' ? student.cin : '_____' }}</h1>
      </div>

      <!-- data edit, couldnt do the neat text turns to input cuz of the variable 
            length of data and data being in single line -->
      <div
        class="w-full flex justify-around items-center flex-row -mt-6"
        v-else
      >
        <base-input
          @change="newFullName = $event.target.value"
          name="student full name"
          :modelValue="student.fullName"
          type="text"
          maxLen="32"
          :error="fullNameErr"
        ></base-input>
        <base-input
          @change="newEmail = $event.target.value"
          name="student email"
          :modelValue="student.email"
          type="text"
          maxLen="32"
          :error="emailErr"
        ></base-input>
        <base-input
          @change="newPhone = $event.target.value"
          name="student phone"
          :modelValue="student.phone"
          type="text"
          maxLen="32"
          :error="phoneErr"
        ></base-input>
        <base-input
          @change="newCne = $event.target.value"
          name="student cne"
          :modelValue="student.cne"
          type="text"
          maxLen="32"
          :error="cneErr"
        ></base-input>
        <base-input
          @change="newCin = $event.target.value"
          name="student cin"
          :modelValue="student.cin"
          type="text"
          maxLen="32"
        ></base-input>
      </div>
    </div>

    <!-- edit/done button -->
    <div
      class="flex justify-center items-center flex-row cursor-pointer h-9 w-20 group"
      v-if="!isInEditMode"
    >
      <span
        @click="isInEditMode = true"
        class="cursor-pointer text-sm flex justify-center items-center ml-2 text-blue-base group-hover:text-blue-light-1"
      >
        <box-icon
          name="pencil"
          type="solid"
          size="cssSize"
          class="w-4 h-4 fill-current mt-1"
          v-pre
        ></box-icon>
      </span>
    </div>

    <div
      class="flex justify-center items-center flex-row cursor-pointer"
      @click="updateSt"
      v-else
    >
      <button
        class="capitalize rounded-none bg-blue-base px-5 py-1 text-xl font-semibold text-black-base hover:bg-blue-light-1 transition duration-200"
      >
        done
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput";
import { mapActions } from "vuex";

export default {
  name: "BaseStudent",
  props: ["student", "gid"],
  emits: ["remove"],
  data() {
    return {
      isInEditMode: false,
      newCne: this.student.cne,
      cneErr: null,
      newFullName: this.student.fullName,
      fullNameErr: null,
      newEmail: this.student.email,
      emailErr: null,
      newPhone: this.student.phone,
      phoneErr: null,
      newCin: this.student.cin,
    };
  },
  methods: {
    ...mapActions(["updateStudent","updateAllStNotes"]),
    removeSt() {
      this.$emit("remove", this.student.id);
    },
    checkDifferent() {
      return {
        general : this.newFullName != this.student.fullName ||
        this.newEmail != this.student.email ||
        this.newPhone != this.student.phone ||
        this.newCin != this.student.cin ||
        this.newCne != this.student.cne
        ? true
        : false,
        crucial: this.newFullName != this.student.fullName ||
        this.newCne != this.student.cne
        ? true
        : false,
      }
      
    },
    checkForNoteUpdate(){
      return this.newFullName != this.student.fullName ;
    },
    updateSt() {
      if (this.test()) {
        let check = this.checkDifferent();
        if (check.general) {
         
          this.updateStudent({
            sid: this.student.id,
            gid: this.gid,
            cne: this.newCne,
            fullName: this.newFullName,
            phone: this.newPhone,
            email: this.newEmail,
            cin: this.newCin,
          });
        // might put this in a then() but for this small app it works fine
        if (check.crucial) {
          
          this.updateAllStNotes({
            sid:this.student.id,
            gid: this.gid,
            cne: this.newCne,
            fullName: this.newFullName,
          })
        }
        } else {
          console.log('failed test');
        }
          this.isInEditMode = false;
      }else{
      this.newFullName= this.student.fullName
      this.newEmail= this.student.email
      this.newPhone= this.student.phone
      this.newCin= this.student.cin
      this.newCne= this.student.cne
      }
    },
    test() {
      var phoneTest = /^(\+212|0)(\d){9}$/;
      var emailTest = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

      var errs = {
        name: this.newFullName.length > 0,
        email: emailTest.test(this.newEmail),
        phone: phoneTest.test(this.newPhone),
        cne: this.newCne.length > 0, 
        // cin: this.newStCin.length > 0, //field is not required
      };
      this.fullNameErr = errs.name ? null : "required Field";
      this.emailErr = errs.email ? null : "invalid email";
      this.phoneErr = errs.phone ? null : "invalid phone number";
      this.cneErr = errs.cne ? null : "required Field";
      
      if (errs.name && errs.email && errs.phone && errs.cne) {
        return true;
      }else return false;
    },
  },
  components: { BaseInput },
};
</script>
