<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />

      <!-- Main App -->
      <!-- only show home page if user is present -->
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left Sidebar-->
           <div class="hidden md:block xs-col-span-1 xl:col-span-2">
              <div class="sticky top-0">
                <SidebarLeft />
              </div>
           </div>

          <!-- Main Content-->
           <main class="col-span-12 md:col-span-8 xl:col-span-6">
              <router-view />
           </main>

          <!-- Right Sidebar-->
           <div class="hidden md:block md:col-span-2 xl:col-span-4 col-span-12">
              <div class="sticky top-0">
                <SidebarRight />
              </div>
           </div>
        </div>
      </div>

      <!-- Auth Page -->
      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})
</script>