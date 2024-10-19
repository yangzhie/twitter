<template>
    <div class="h-screen flex flex-col">
        <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20" :class="defaultTransition">
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <LogoTwitter />
                </div>
            </NuxtLink>
        </div>

        <div class="mt-2 space-y-3">
            <SidebarLeftTab active>
                <!-- inserts content from parent, notice <template> is used -->
                <template v-slot:icon>
                    <AnFilledHome class="text-2xl" />
                </template>

                <template v-slot:name>
                    Home
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <AkHashtag class="text-2xl" />
                </template>

                <template v-slot:name>
                    Explore
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <CaNotification class="text-2xl" />
                </template>

                <template v-slot:name>
                    Notifications
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <FlFilledMail class="text-2xl" />
                </template>

                <template v-slot:name>
                    Messages
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <BsBookmarksFill class="text-2xl" />
                </template>

                <template v-slot:name>
                    Bookmarks
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <FlFilledDocumentBulletList class="text-2xl" />
                </template>

                <template v-slot:name>
                    Lists
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <AkPerson class="text-2xl" />
                </template>

                <template v-slot:name>
                    Profile
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <AnFilledMessage class="text-2xl" />
                </template>

                <template v-slot:name>
                    More
                </template>
            </SidebarLeftTab>

            <div class="hidden xl:block">
                <UIButton liquid size="lg" @on-click="emits('onTweet')">
                    <strong>
                        Tweet
                    </strong>
                </UIButton>
            </div>

            <div class="block xl:hidden">
                <UIButton @on-click="emits('onTweet')">
                    <div class=" w-8 h-6 font-bold flex justify-center">
                        <AkPencil class="text-2xl" />
                    </div>
                </UIButton>
            </div>
        </div>

        <div :class="defaultTransition" @click="emits('onLogout')"
            class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800">
            <div class="flex flex-row ">
                <img :src="props.user.profileImage" class="w-10 h-10 rounded-full">

                <div class="flex-col hidden ml-2 xl:block">
                    <h1 class="text-sm font-bold text-gray-800 dark:text-white">
                        {{ user.name }}
                    </h1>

                    <p class="text-sm text-gray-400">{{ user.handle }}</p>
                </div>
            </div>

            <div class="hidden ml-auto xl:block">
                <div class="w-6 h-6">
                    <BsChevronDoubleDown />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { BsChevronDoubleDown, AkPencil, AkHashtag, AkPerson, AnFilledHome, AnFilledMessage, BsBookmarksFill, CaNotification, FlFilledDocumentBulletList, FlFilledMail } from '@kalimahapps/vue-icons';
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['onTweet', 'onLogout'])
</script>