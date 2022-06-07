<template>
  <div>
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="right">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="500px"
        border
        stripe
      >
        <el-table-column
          v-if="showColumnSelection"
          type="selection"
          align="center"
        />
        <el-table-column
          v-if="showColumnIndex"
          type="index"
          label="序号"
          width="60"
          align="center"
        />
        <template v-for="item in tableConfig" :key="item.prop">
          <el-table-column
            v-bind="item"
            align="center"
            show-overflow-tooltip
            v-if="item.slotName !== 'handler' || isHandler"
          >
            <template #default="scope">
              <!-- 动态具名插槽 通过传递的插槽名称来实现 scope 将当前行数据通过作用域插槽传递出去 外部可通过 #defalut="{ scope }(作用域插槽数据的名称)" 来获取 -->
              <slot :name="item.slotName" :scope="scope.row">
                <!-- 将当前行数据默认展示(使用动态插槽就是需要展示一些需要经过处理的数据格式) -->
                {{ item.prop && scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer" v-if="showFooter && isQuery">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPropType } from '../types'

interface IProps {
  tableConfig: IPropType[]
  showColumnSelection?: boolean
  showColumnIndex?: boolean
  tableData?: any[]
  title?: string
  showFooter?: boolean
  isHandler?: boolean
  isQuery?: boolean
  total?: number
}

type IEmits = {
  (e: 'changeSize', currentSize: number): void
  (e: 'changePage', currentPage: number): void
}

withDefaults(defineProps<IProps>(), {
  tableData: () => [],
  total: 0,
  isHandler: true,
  isQuery: true
})

const emits = defineEmits<IEmits>()

const handleSizeChange = (currentSize: number) => {
  emits('changeSize', currentSize)
}

const handleCurrentChange = (currentPage: number) => {
  emits('changePage', currentPage)
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;

  .title {
    font-size: 18px;
    font-weight: 700;
  }
}

.footer {
  display: flex;
  justify-content: center;

  padding: 20px 10px;
}
</style>
