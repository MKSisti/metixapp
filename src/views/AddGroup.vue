<template>
  <div class="capitalize relative h-full  space-y-8">
    <div class="mb-6">
      <h1 class=" text-4xl font-bold">ADD A NEW GROUP</h1>
    </div>
    <div class="space-y-3">
      <h1 class="font-semibold mb-2  text-2xl">name your group</h1>
      <div class="ml-8">
        <label for="group-name" class="block text-xl font-light uppercase">Group name</label>
        <input
          type="text"
          name="group-name"
          id="group-name"
          class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2  px-6  py-4"
          placeholder="Group1"
        />
      </div>
    </div>
    <div>
      <h1 class="font-semibold mb-2 text-2xl">Notes</h1>
      <div class="ml-8 flex flex-row justify-start ">
        <div>
          <label for="validation" class="block text-xl font-light uppercase">Validation</label>
          <input
            type="number"
            name="validation"
            id="validation"
            class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2 px-6 py-4 w-3/5"
            value="12"
          />
        </div>
        <div>
          <label for="eliminatoire" class="block text-xl font-light uppercase">eliminatoire</label>
          <input
            type="number"
            name="eliminatoire"
            id="eliminatoire"
            class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2 px-6 py-4 w-3/5"
            value="8"
          />
        </div>
        <div>
          <label for="Assez-bien" class="block text-xl font-light uppercase">Assez-bien</label>
          <input
            type="number"
            name="Assez-bien"
            id="Assez-bien"
            class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2 px-6 py-4 w-3/5"
            value="12"
          />
        </div>
        <div>
          <label for="bien" class="block text-xl font-light uppercase">bien</label>
          <input
            type="number"
            name="bien"
            id="bien"
            class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2 px-6 py-4 w-3/5"
            value="15"
          />
        </div>
        <div>
          <label for="excellent" class="block text-xl font-light uppercase">excellent</label>
          <input
            type="number"
            name="excellent"
            id="excellent"
            class="border-black-light-10 border-2 bg-black-base p-1 text-xl placeholder-black-light-10 mt-2 px-6 py-4 w-3/5"
            value="17"
          />
        </div>
      </div>
    </div>
    <div>
      <h1 class="font-semibold mb-2 text-2xl">Optional Info</h1>
      <div class="ml-8">
        <label for="desc" class="block text-xl font-light uppercase">Description</label>
        <textarea
          id="desc"
          name="desc"
          rows="2"
          maxlength="224"
          placeholder="..."
          class="border-black-light-10 border-2 bg-black-base p-1 text-xl w-4/6 max-h-24 min-h-4 placeholder-black-light-10 mt-2 px-6 py-4"
        >
        </textarea>
      </div>
    </div>
    <div class="absolute bottom-0 right-0">
      <button class="bg-blue-base px-8 py-2 text-xl text-black-base">
        Done
      </button>
    </div>
  </div>
</template>