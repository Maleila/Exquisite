<template>
  <div class="text-page">
    <h1>Viewhistory</h1>
    <p>about</p>
    <!--Andre Breton quote from https://web.archive.org/web/20080127195653/http://exquisitecorpse.com/definition/Bretons_Remembrances.html-->
    <router-link to="/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Back</button>
    </router-link>
  </div>
</template>
