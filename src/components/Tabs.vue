<template>
    <div>
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="{ active: tab.name === activeTab }"
                @click="selectTab(tab.name)">
                <span class="mdi" :class="tab.icon"></span>
                {{ tab.label }}
            </button>
        </div>
        <div class="tab-content">
            <slot :active="activeTab"></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Tabs',
    props: ['tabs', 'initialTab'],
    setup(props, { emit }) {
        const activeTab = ref(props.initialTab);

        const selectTab = (name) => {
            activeTab.value = name;
            emit('update:activeTab', name);  // Emitting the active tab's name
        };

        return { activeTab, selectTab };
    }
});
</script>

<style>
.tabs {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    list-style-type: none;
}

.tabs button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    background-color: transparent;
    font-size: 16px;
    color: #333;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
    outline: none;
}

.tabs button.active,
.tabs button:hover {
    color: #f79202;
    border-bottom: 3px solid #f79202;
}

.tabs .mdi {
    font-size: 24px;
    margin-right: 8px;
}

.tab-content {
    padding: 20px;
    transition: all 0.3s ease;
    background-color: #fff;
}
</style>
