<template>
    <div class="flex flex-col">
        <!-- Preview card: what's happening -->
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
                    <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <!-- Preview card: follow -->
        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" alt="whoToFollow.name">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>

                    <div class="flex h-full">
                        <button 
                            class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
                        >
                            Follow
                        </button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
    </div>
</template>

<script setup>
const whatsHappeningItems = ref([
    {
        title: 'SpaceX',
        count: '17.2k Tweets'
    },
    {
        title: 'Anime',
        count: '19.2k Tweets'
    },
    {
        title: 'JJK',
        count: '9.3k Tweets'
    }
])

const whoToFollowItems = ref([
    {
        name: 'Arnav Malasi',
        handle: '@arn',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Rocky',
        handle: '@therealrocky',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'Oslo',
        handle: '@oslothedog',
        image: 'https://picsum.photos/200/200'
    }
])
</script>
