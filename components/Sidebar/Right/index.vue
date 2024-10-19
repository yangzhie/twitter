<template>
    <div class="flex flex-col">
        <!-- Seach bar -->
        <div class="relative m-2">
            <div class=" absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                <div class="w-6 h-6">
                    <SearchIcon @click="handleSearch" />
                </div>
            </div>
            <input type="text" v-model="search" placeholder="Search tweets..."
                class="flex items-center w-full pl-12 text-sm text-black font-normal dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9">
        </div>

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
                            class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">
                            Follow
                        </button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <footer>
            <ul class="mx-2 my-4 text-xs text-gray-500">
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark Mode</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline">Cookie Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline">Accessibility</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline">Ads Info</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="" class="hover:underline">More</a>
                </li>
                <li class="inline-block mx-2">
                    &copy; 2024 Twitter, Inc.
                </li>
            </ul>
        </footer>
    </div>
</template>

<script setup>
import { SearchIcon } from '@heroicons/vue/outline'

const emit = defineEmits(['toggleDarkMode'])
const search = ref("")

const handleSearch = () => {
    const router = useRouter()
    router.push({
        path: "/search",
        query: {
            q: search.value
        }
    })
}

const handleToggleDarkMode = () => {
    emit('toggleDarkMode')
}

const whatsHappeningItems = ref([
    {
        title: 'Dandadan',
        count: '17.2k Tweets'
    },
    {
        title: 'Anime',
        count: '19.2k Tweets'
    },
    {
        title: 'HTTP Server in C',
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
        name: 'Kendrick Lamar',
        handle: '@kendricklamar',
        image: 'https://picsum.photos/200/200'
    },
    {
        name: 'under',
        handle: '@1underthesun_',
        image: 'https://picsum.photos/200/200'
    }
])
</script>
