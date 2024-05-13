<script setup lang="ts">
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VToolbarTitle } from "vuetify/lib/components/index.mjs";
import { VDialog } from "vuetify/lib/components/index.mjs";

const posts = ref([
    { title: "Post 1", author: "Fred" },
    { title: "Post 2", author: "Wilma" },
    { title: "Post 3", author: "Barney" },
    { title: "Post 4", author: "Bam-Bam" },
    { title: "Post 5", author: "Fred" },
    { title: "Post 6", author: "Wilma" },
    { title: "Post 7", author: "Barney" },
    { title: "Post 8", author: "Bam-Bam" },
    { title: "Post 9", author: "Fred" },
    { title: "Post 10", author: "Wilma" },
    { title: "Post 11", author: "Barney" },
    { title: "Post 12", author: "Bam-Bam" },
]);

const selected = ref([]);
const dialogDelete = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
    title: "",
    author: ""
});

const editItem = (item) => {
    editedIndex.value = posts.value.findIndex((post) => post.title === item.title);
    editedItem.value = { ...item };
    dialog.value = true;
};

const close = () => {
    dialog.value = false;
    editedIndex.value = -1;
    editedItem.value = { title: "", author: "" };
};

const save = () => {
    if (editedIndex.value > -1) {
        Object.assign(posts.value[editedIndex.value], editedItem.value);
    } else {
        // Insert new item at the beginning of the array
        posts.value.unshift(editedItem.value);
    }
    close();
};

const deleteItem = (item) => {
    selected.value = [item];
    dialogDelete.value = true;
};

const deleteItemConfirm = () => {
    const item = selected.value[0];
    const index = posts.value.findIndex((post) => post.title === item.title);
    if (index !== -1) {
        posts.value.splice(index, 1);
    }
    dialogDelete.value = false;
};

const closeDelete = () => {
    dialogDelete.value = false;
};

const addNewItem = () => {
    dialog.value = true;
};

</script>

<template>
    <v-data-table v-model="selected"
        :headers="[{ title: 'Post Title', value: 'title' }, { title: 'Post Author', value: 'author' }, { title: 'Actions', key: 'actions', sortable: false },]"
        :items="posts" item-key="title">
        <template v-slot:top>
            <v-toolbar>
                <v-toolbar-title>My CRUD Table</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn class="mb-2" color="primary" dark @click="addNewItem">New Item</v-btn>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ editedIndex.value === -1 ? 'New Item' : 'Edit Item' }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="editedItem.title" label="Post Title"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editedItem.author" label="Post Author"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
