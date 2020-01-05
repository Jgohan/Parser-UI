<template>
    <v-data-table>
      <template>
        <v-toolbar flat>
          <v-toolbar-title>Rules</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary">New rule</v-btn>
        </v-toolbar>
      </template>
      <template>
        <v-tooltip bottom>
          <template>
            <v-icon small >open_in_new</v-icon>
          </template>
          <span>Detail</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template>
            <v-icon small class="mx-2">
              edit
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template>
            <v-icon small>delete</v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
</template>

<script>
export default {
}
</script>