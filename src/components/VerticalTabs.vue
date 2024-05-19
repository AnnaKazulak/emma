<template>
    <div class="vertical-tabs-container">
        <div class="vertical-tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="{ 'active': tab.name === activeTab }"
                @click="selectTab(tab.name)">
                {{ tab.label }}
            </button>
        </div>
        <div class="vertical-tab-content">
            <slot :active="activeTab"></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'VerticalTabs',
    props: {
        tabs: Array,
        initialTab: String
    },
    setup(props, { emit }) {
        const activeTab = ref(props.initialTab);

        const selectTab = (name) => {
            activeTab.value = name;
            emit('update:activeVerticalTab', name);
        };

        return { activeTab, selectTab };
    }
});
</script>

<style scoped>
.vertical-tabs-container {
    display: flex;
    height: 100%;
}

.vertical-tabs {
    display: flex;
    flex-direction: column;
    padding: 10px;
    list-style-type: none;
    min-width: 200px;
}

.vertical-tab-content {
    flex-grow: 1;
    padding: 20px;
}

button {
    display: block;
    text-align: left;
    width: 100%;
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: #f79202;
    color: white;
}

button.active {
    background-color: #f79202;
    color: white;
}
</style>
