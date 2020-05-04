function isEmpty(value) {
	if(value !== undefined || value !== null){
		return false
	}
	return true
}

export const Position = [
	{name: '室内', value: 0},
	{name: '公共区域', value: 1},
]
export const Status = [
	{
		name: '待接单', value: 0
	},
	{
		name: '接单处理中', value: 1
	},
	{
		name: '未付款', value: 2
	},
	{
		name: '已结束', value: 3
	},
	{
		name: '已评价', value: 4
	}
]