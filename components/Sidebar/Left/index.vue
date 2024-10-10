<template>
    <div class="h-screen flex flex-col">
        <div 
            class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
            :class="defaultTransition"
        >
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
                <UIButton liquid size="lg">
                    <strong>
                        Tweet
                    </strong>
                </UIButton>
            </div>

            <div class="block xl:hidden">
                <UIButton>
                    <div class="w-8 h-6 font-bold">
                        <AkPencil/>
                    </div>
                </UIButton>
            </div>
        </div>
     </div>
</template>

<script setup>
    import { AkPencil, AkHashtag, AkPerson, AnFilledHome, AnFilledMessage, BsBookmarksFill, CaNotification, FlFilledDocumentBulletList, FlFilledMail } from '@kalimahapps/vue-icons';
    const { defaultTransition } = useTailwindConfig()
</script>