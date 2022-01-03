<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInput"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框  这里还可以换成@change="(e)=>cbStatusChange(item.id)"-->
        <a-checkbox
          :checked="item.done"
          @change="cbStatusChange(item.id, $event)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infoList"]),
  },
  methods: {
    handleInput(e) {
      console.log(e.target.value);
      this.$store.commit("inputValueChange", e.target.value);
    },
    addItem() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning("这个内容不能为空");
      }
      this.$store.commit("addList");
    },
    removeItemById(id) {
      console.log(id);
      this.$store.commit("removeItem", id);
    },
    cbStatusChange(id, e) {
      console.log(e.target.checked);
      console.log(id);
      const parma = {
        id: id,
        status: e.target.checked,
      };
      this.$store.commit("statusChange", parma);
    },
    clean() {
      this.$store.commit("cleanStatus");
    },
    changeList(key) {
      console.log(key);
      this.$store.commit("changeViewKey", key);
    },
  },
};
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
