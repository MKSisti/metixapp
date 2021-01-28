<template>
  <div class="capitalize relative h-full space-y-4">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">ADD A NEW GROUP</h1>
    </div>
    <div class="space-y-3 text-lg">
      <h1 class="font-semibold mb-2">name your group</h1>
      <div class="ml-8">
        <label for="group-name" class="block">Group name</label>
        <input
          type="text"
          name="group-name"
          class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
        />
      </div>
    </div>
    <div>
      <h1 class="font-semibold mb-2">Notes</h1>
      <div class="ml-8 flex flex-row justify-start space-x-8">
        <div>
          <label for="validation" class="block">Validation</label>
          <input
            type="number"
            name="validation"
            id="validation"
            class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
            value="12"
          />
        </div>
        <div>
          <label for="eliminatoire" class="block">eliminatoire</label>
          <input
            type="number"
            name="eliminatoire"
            id="eliminatoire"
            class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
            value="8"
          />
        </div>
        <div>
          <label for="Assez-bien" class="block">Assez-bien</label>
          <input
            type="number"
            name="Assez-bien"
            id="Assez-bien"
            class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
            value="12"
          />
        </div>
        <div>
          <label for="bien" class="block">bien</label>
          <input
            type="number"
            name="bien"
            id="bien"
            class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
            value="15"
          />
        </div>
        <div>
          <label for="excellent" class="block">excellent</label>
          <input
            type="number"
            name="excellent"
            id="excellent"
            class="border-black-light-10 border-2 bg-black-base p-1 text-lg"
            value="17"
          />
        </div>
      </div>
    </div>
    <div>
      <h1 class="font-semibold mb-2">Optional Info</h1>
      <div class="ml-8">
        <label for="desc" class="block">Description</label>
        <input
          type="text"
          name="desc"
          id="desc"
          class="border-black-light-10 border-2 bg-black-base p-1 text-lg w-10/12"
          placeholder="..."
        />
      </div>
    </div>
    <div class="absolute bottom-0 right-0">
      <button class="bg-blue-base px-8 py-2 text-xl text-black-base">Done</button>
    </div>
  </div>
</template>