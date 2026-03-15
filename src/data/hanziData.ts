// Mock data for Chinese characters - MVP version
// Contains common elementary school Chinese characters

export interface HanziDetail {
  char: string
  pinyin: string
  audioText: string
  words: string[]
  isPolyphonic?: boolean
  strokeCount?: number
  radical?: string
}

export const hanziData: Record<string, HanziDetail> = {
  "春": {
    char: "春",
    pinyin: "chūn",
    audioText: "春",
    words: ["春天", "春风", "春雨", "春色", "春季", "春游", "春耕", "春晓"],
    strokeCount: 9,
    radical: "日"
  },
  "秋": {
    char: "秋",
    pinyin: "qiū",
    audioText: "秋",
    words: ["秋天", "秋风", "秋雨", "秋色", "秋季", "秋游", "秋收", "秋粮"],
    strokeCount: 9,
    radical: "火"
  },
  "夏": {
    char: "夏",
    pinyin: "xià",
    audioText: "夏",
    words: ["夏天", "夏风", "夏雨", "夏日", "夏季", "夏令营", "夏装", "夏粮"],
    strokeCount: 10,
    radical: "夂"
  },
  "冬": {
    char: "冬",
    pinyin: "dōng",
    audioText: "冬",
    words: ["冬天", "冬风", "冬雨", "冬日", "冬季", "冬至", "冬装", "冬眠"],
    strokeCount: 5,
    radical: "夂"
  },
  "花": {
    char: "花",
    pinyin: "huā",
    audioText: "花",
    words: ["花朵", "花园", "花费", "花瓣", "花蕾", "花椒", "花样", "花茶"],
    strokeCount: 7,
    radical: "艹"
  },
  "草": {
    char: "草",
    pinyin: "cǎo",
    audioText: "草",
    words: ["小草", "草地", "草原", "草木", "草书", "草莓", "草帽", "草坪"],
    strokeCount: 9,
    radical: "艹"
  },
  "树": {
    char: "树",
    pinyin: "shù",
    audioText: "树",
    words: ["树木", "树叶", "树干", "树林", "树立", "果树", "松树", "柳树"],
    strokeCount: 9,
    radical: "木"
  },
  "山": {
    char: "山",
    pinyin: "shān",
    audioText: "山",
    words: ["高山", "山上", "山地", "山丘", "山脉", "山峰", "山脚", "山区"],
    strokeCount: 3,
    radical: "山"
  },
  "水": {
    char: "水",
    pinyin: "shuǐ",
    audioText: "水",
    words: ["水果", "喝水", "水上", "水边", "水管", "水稻", "水彩", "水壶"],
    strokeCount: 4,
    radical: "水"
  },
  "火": {
    char: "火",
    pinyin: "huǒ",
    audioText: "火",
    words: ["火车", "大火", "火光", "火柴", "火苗", "火焰", "火堆", "火热"],
    strokeCount: 4,
    radical: "火"
  },
  "日": {
    char: "日",
    pinyin: "rì",
    audioText: "日",
    words: ["今日", "日出", "日记", "日光", "日历", "日期", "日夜", "日子"],
    strokeCount: 4,
    radical: "日"
  },
  "月": {
    char: "月",
    pinyin: "yuè",
    audioText: "月",
    words: ["月亮", "月光", "月饼", "月季", "日历", "月份", "一月", "赏月"],
    strokeCount: 4,
    radical: "月"
  },
  "天": {
    char: "天",
    pinyin: "tiān",
    audioText: "天",
    words: ["今天", "天气", "天空", "天才", "天王", "冬天", "春天", "晴天"],
    strokeCount: 4,
    radical: "大"
  },
  "地": {
    char: "地",
    pinyin: "dì",
    audioText: "地",
    words: ["土地", "地方", "大地", "地点", "地上", "地球", "地理", "地位"],
    strokeCount: 6,
    radical: "土"
  },
  "风": {
    char: "风",
    pinyin: "fēng",
    audioText: "风",
    words: ["大风", "风力", "风向", "风景", "风湿", "风筝", "刮风", "风口"],
    strokeCount: 4,
    radical: "风"
  },
  "雨": {
    char: "雨",
    pinyin: "yǔ",
    audioText: "雨",
    words: ["下雨", "雨水", "雨伞", "雨衣", "雨天", "雨点", "雨鞋", "暴雨"],
    strokeCount: 8,
    radical: "雨"
  },
  "云": {
    char: "云",
    pinyin: "yún",
    audioText: "云",
    words: ["白云", "云彩", "云朵", "云梯", "云端", "乌云", "云霞", "云海"],
    strokeCount: 4,
    radical: "云"
  },
  "星": {
    char: "星",
    pinyin: "xīng",
    audioText: "星",
    words: ["星星", "星光", "星空", "行星", "卫星", "明星", "歌星", "福星"],
    strokeCount: 9,
    radical: "日"
  },
  "鸟": {
    char: "鸟",
    pinyin: "niǎo",
    audioText: "鸟",
    words: ["小鸟", "鸟儿", "鸟巢", "鸟蛋", "鸟类", "海鸟", "鸟鸣", "鸟笼"],
    strokeCount: 5,
    radical: "鸟"
  },
  "鱼": {
    char: "鱼",
    pinyin: "yú",
    audioText: "鱼",
    words: ["小鱼", "鱼儿", "鱼鳞", "鱼刺", "钓鱼", "鱼缸", "鱼塘", "鱼丸"],
    strokeCount: 8,
    radical: "鱼"
  },
  "马": {
    char: "马",
    pinyin: "mǎ",
    audioText: "马",
    words: ["小马", "马上", "马匹", "黑马", "木马", "赛马", "马车", "马鞍"],
    strokeCount: 3,
    radical: "马"
  },
  "牛": {
    char: "牛",
    pinyin: "niú",
    audioText: "牛",
    words: ["小牛", "牛奶", "水牛", "牛排", "牛市", "牛角", "吹牛", "牛蛙"],
    strokeCount: 4,
    radical: "牛"
  },
  "羊": {
    char: "羊",
    pinyin: "yáng",
    audioText: "羊",
    words: ["小羊", "山羊", "绵羊", "羊毛", "羊奶", "羊角", "羊圈", "羚羊"],
    strokeCount: 6,
    radical: "羊"
  },
  "人": {
    char: "人",
    pinyin: "rén",
    audioText: "人",
    words: ["人们", "大人", "小人", "人身", "人才", "人物", "人格"],
    strokeCount: 2,
    radical: "人"
  },
  "口": {
    char: "口",
    pinyin: "kǒu",
    audioText: "口",
    words: ["口水", "人口", "门口", "口头", "口袋", "口才", "口味", "口红"],
    strokeCount: 3,
    radical: "口"
  },
  "心": {
    char: "心",
    pinyin: "xīn",
    audioText: "心",
    words: ["心里", "开心", "小心", "爱心", "专心", "真心", "心情", "心脏"],
    strokeCount: 4,
    radical: "心"
  },
  "手": {
    char: "手",
    pinyin: "shǒu",
    audioText: "手",
    words: ["手机", "左手", "右手", "手工", "手势", "手掌", "手艺", "手帕"],
    strokeCount: 4,
    radical: "手"
  },
  "足": {
    char: "足",
    pinyin: "zú",
    audioText: "足",
    words: ["足球", "手足", "足够", "知足", "满足", "足球队", "足迹", "足彩"],
    strokeCount: 7,
    radical: "足"
  },
  "目": {
    char: "目",
    pinyin: "mù",
    audioText: "目",
    words: ["目光", "眼目", "目的", "目录", "目送", "瞩目", "眉目", "条目"],
    strokeCount: 5,
    radical: "目"
  },
  "耳": {
    char: "耳",
    pinyin: "ěr",
    audioText: "耳",
    words: ["耳朵", "耳机", "耳旁", "耳鸣", "耳语", "银耳", "木耳", "耳麦"],
    strokeCount: 6,
    radical: "耳"
  },
  "头": {
    char: "头",
    pinyin: "tóu",
    audioText: "头",
    words: ["头发", "头痛", "头目", "带头", "石头", "馒头", "罐头", "派头"],
    strokeCount: 5,
    radical: "大"
  },
  "米": {
    char: "米",
    pinyin: "mǐ",
    audioText: "米",
    words: ["大米", "米饭", "小米", "米粥", "米酒", "厘米", "毫米"],
    strokeCount: 6,
    radical: "米"
  },
  "土": {
    char: "土",
    pinyin: "tǔ",
    audioText: "土",
    words: ["土地", "泥土", "黄土", "土壤", "土堆", "土星", "土特产"],
    strokeCount: 3,
    radical: "土"
  },
  "石": {
    char: "石",
    pinyin: "shí",
    audioText: "石",
    words: ["石头", "石油", "石墨", "矿石", "化石", "宝石", "岩石"],
    strokeCount: 5,
    radical: "石"
  },
  "木": {
    char: "木",
    pinyin: "mù",
    audioText: "木",
    words: ["树木", "木头", "木工", "木耳", "木箱", "木椅", "木材", "木船"],
    strokeCount: 4,
    radical: "木"
  },
  "竹": {
    char: "竹",
    pinyin: "zhú",
    audioText: "竹",
    words: ["竹子", "竹笋", "竹椅", "竹竿", "竹叶", "竹笛", "竹林", "竹筏"],
    strokeCount: 6,
    radical: "竹"
  },
  "书": {
    char: "书",
    pinyin: "shū",
    audioText: "书",
    words: ["书包", "书本", "书店", "书记", "书房", "书画", "书信", "书屋"],
    strokeCount: 4,
    radical: "乙"
  },
  "笔": {
    char: "笔",
    pinyin: "bǐ",
    audioText: "笔",
    words: ["铅笔", "毛笔", "笔触", "笔记", "笔试", "笔顺", "钢笔", "文具"],
    strokeCount: 10,
    radical: "竹"
  },
  "纸": {
    char: "纸",
    pinyin: "zhǐ",
    audioText: "纸",
    words: ["纸张", "纸飞机", "纸巾", "纸箱", "剪纸", "造纸", "纸币", "纸上"],
    strokeCount: 7,
    radical: "纟"
  },
  "本": {
    char: "本",
    pinyin: "běn",
    audioText: "本",
    words: ["本子", "书本", "本来", "本身", "本人", "日本", "课本", "日记本"],
    strokeCount: 5,
    radical: "木"
  },
  "学": {
    char: "学",
    pinyin: "xué",
    audioText: "学",
    words: ["学习", "学校", "学生", "学问", "学分", "留学", "自学", "学费"],
    strokeCount: 8,
    radical: "子"
  },
  "校": {
    char: "校",
    pinyin: "xiào",
    audioText: "校",
    words: ["学校", "校园", "校长", "校门", "校服", "校对", "校草", "校友"],
    strokeCount: 10,
    radical: "木"
  },
  "友": {
    char: "友",
    pinyin: "yǒu",
    audioText: "友",
    words: ["朋友", "友情", "友谊", "友好", "友爱", "友人", "学友", "盟友"],
    strokeCount: 4,
    radical: "又"
  },
  "爱": {
    char: "爱",
    pinyin: "ài",
    audioText: "爱",
    words: ["爱心", "可爱", "热爱", "亲爱的", "爱戴", "爱护", "爱情", "爱慕"],
    strokeCount: 10,
    radical: "爪"
  },
  "好": {
    char: "好",
    pinyin: "hǎo",
    audioText: "好",
    words: ["好处", "好人", "最好", "好像", "好奇", "好转", "刚好", "美好"],
    strokeCount: 6,
    radical: "女"
  },
  "你": {
    char: "你",
    pinyin: "nǐ",
    audioText: "你",
    words: ["你们", "你好", "你的"],
    strokeCount: 7,
    radical: "亻"
  },
  "我": {
    char: "我",
    pinyin: "wǒ",
    audioText: "我",
    words: ["我们", "我的", "我爱", "自我"],
    strokeCount: 7,
    radical: "戈"
  },
  "他": {
    char: "他",
    pinyin: "tā",
    audioText: "他",
    words: ["他们", "他的", "他人", "他乡"],
    strokeCount: 5,
    radical: "亻"
  },
  "她": {
    char: "她",
    pinyin: "tā",
    audioText: "她",
    words: ["她们", "她的"],
    strokeCount: 6,
    radical: "女"
  },
  "它": {
    char: "它",
    pinyin: "tā",
    audioText: "它",
    words: ["它们", "它的"],
    strokeCount: 5,
    radical: "宀"
  },
  "是": {
    char: "是",
    pinyin: "shì",
    audioText: "是",
    words: ["是的", "不是", "可是", "就是", "还是", "只是", "总是", "于是"],
    strokeCount: 9,
    radical: "日"
  },
  "的": {
    char: "的",
    pinyin: "de",
    audioText: "的",
    words: ["我的", "你的", "他的", "她的", "它的", "好的", "大的", "小的"],
    strokeCount: 8,
    radical: "白"
  },
  "了": {
    char: "了",
    pinyin: "le",
    audioText: "了",
    words: ["来了", "好了", "到了", "知道了", "罢了", "算了"],
    strokeCount: 2,
    radical: "乙"
  },
  "在": {
    char: "在",
    pinyin: "zài",
    audioText: "在",
    words: ["在家", "在此", "现在", "正在", "存在", "实在", "外在", "内在"],
    strokeCount: 6,
    radical: "土"
  },
  "有": {
    char: "有",
    pinyin: "yǒu",
    audioText: "有",
    words: ["有人", "没有", "只有", "拥有", "有趣", "有效", "有关", "有益"],
    strokeCount: 6,
    radical: "月"
  },
  "没": {
    char: "没",
    pinyin: "méi",
    audioText: "没",
    words: ["没有", "没关系", "没用", "没趣", "没完", "没事", "没法"],
    strokeCount: 7,
    radical: "氵"
  },
  "看": {
    char: "看",
    pinyin: "kàn",
    audioText: "看",
    words: ["看书", "看字", "看见", "好看", "观看", "看待", "看护", "看板"],
    strokeCount: 9,
    radical: "目"
  },
  "听": {
    char: "听",
    pinyin: "tīng",
    audioText: "听",
    words: ["听说", "听力", "好听", "动听", "听写", "旁听", "听诊", "听筒"],
    strokeCount: 7,
    radical: "口"
  },
  "说": {
    char: "说",
    pinyin: "shuō",
    audioText: "说",
    words: ["说话", "听说", "说明", "小说", "传说", "说唱", "说服", "说谎"],
    strokeCount: 9,
    radical: "言"
  },
  "写": {
    char: "写",
    pinyin: "xiě",
    audioText: "写",
    words: ["写字", "写作", "书写", "听写", "描写", "抄写", "填写"],
    strokeCount: 5,
    radical: "冖"
  },
  "读": {
    char: "读",
    pinyin: "dú",
    audioText: "读",
    words: ["读书", "朗读", "阅读", "读音", "读取", "读物", "拜读", "研读"],
    strokeCount: 10,
    radical: "言"
  },
  "吃": {
    char: "吃",
    pinyin: "chī",
    audioText: "吃",
    words: ["吃饭", "小吃", "口吃", "好吃", "零食", "吃苦"],
    strokeCount: 6,
    radical: "口"
  },
  "喝": {
    char: "喝",
    pinyin: "hē",
    audioText: "喝",
    words: ["喝水", "喝茶", "喝酒", "喝汤", "吃喝", "喝彩", "喝斥"],
    strokeCount: 12,
    radical: "口"
  },
  "走": {
    char: "走",
    pinyin: "zǒu",
    audioText: "走",
    words: ["走路", "走开", "走好", "走运", "走狗", "走俏", "走廊", "走道"],
    strokeCount: 7,
    radical: "走"
  },
  "跑": {
    char: "跑",
    pinyin: "pǎo",
    audioText: "跑",
    words: ["跑步", "跑道", "跑跳", "快跑", "长跑", "赛跑", "跑鞋"],
    strokeCount: 12,
    radical: "足"
  },
  "跳": {
    char: "跳",
    pinyin: "tiào",
    audioText: "跳",
    words: ["跳舞", "跳高", "跳远", "跳绳", "跳动", "跳伞", "跳棋"],
    strokeCount: 13,
    radical: "足"
  },
  "坐": {
    char: "坐",
    pinyin: "zuò",
    audioText: "坐",
    words: ["坐下", "请坐", "坐姿", "坐标", "坐庄", "坐牢", "坐垫", "坐骑"],
    strokeCount: 7,
    radical: "土"
  },
  "立": {
    char: "立",
    pinyin: "lì",
    audioText: "立",
    words: ["立正", "站立", "立刻", "立方", "立春", "立夏", "立秋", "立冬"],
    strokeCount: 5,
    radical: "立"
  },
  "笑": {
    char: "笑",
    pinyin: "xiào",
    audioText: "笑",
    words: ["笑声", "笑话", "笑脸", "微笑", "大笑", "笑眯眯", "笑哈哈", "笑柄"],
    strokeCount: 10,
    radical: "竹"
  },
  "哭": {
    char: "哭",
    pinyin: "kū",
    audioText: "哭",
    words: ["哭泣", "哭声", "哭闹", "哭诉", "号哭", "啼哭", "哭鼻子"],
    strokeCount: 10,
    radical: "口"
  },
  "明": {
    char: "明",
    pinyin: "míng",
    audioText: "明",
    words: ["明天", "明亮", "明月", "明白", "说明", "聪明", "透明", "发明"],
    strokeCount: 8,
    radical: "日"
  },
  "白": {
    char: "白",
    pinyin: "bái",
    audioText: "白",
    words: ["白色", "白天", "白云", "白菜", "白马", "白银", "白纸", "白雪"],
    strokeCount: 5,
    radical: "白"
  },
  "红": {
    char: "红",
    pinyin: "hóng",
    audioText: "红",
    words: ["红色", "红花", "红旗", "口红", "红薯", "红枣", "红外", "红润"],
    strokeCount: 6,
    radical: "纟"
  },
  "黄": {
    char: "黄",
    pinyin: "huáng",
    audioText: "黄",
    words: ["黄色", "黄河", "黄金", "黄瓜", "黄豆", "黄鹂", "黄昏"],
    strokeCount: 11,
    radical: "黄"
  },
  "蓝": {
    char: "蓝",
    pinyin: "lán",
    audioText: "蓝",
    words: ["蓝色", "蓝天", "蓝莓", "蓝图", "蓝领", "蓝鲸"],
    strokeCount: 13,
    radical: "艹"
  },
  "绿": {
    char: "绿",
    pinyin: "lǜ",
    audioText: "绿",
    words: ["绿色", "绿茶", "绿叶", "绿地", "绿草", "绿灯", "绿树", "绿荫"],
    strokeCount: 11,
    radical: "纟"
  },
  "黑": {
    char: "黑",
    pinyin: "hēi",
    audioText: "黑",
    words: ["黑色", "黑夜", "黑板", "黑豆", "黑人", "黑暗", "黑心", "黑客"],
    strokeCount: 12,
    radical: "黑"
  },
  "清": {
    char: "清",
    pinyin: "qīng",
    audioText: "清",
    words: ["清水", "清洁", "清白", "清楚", "清晨", "清单", "清蒸", "清仓"],
    strokeCount: 11,
    radical: "氵"
  },
  "江": {
    char: "江",
    pinyin: "jiāng",
    audioText: "江",
    words: ["长江", "江山", "江河", "江面", "江岸", "江北", "江南", "江湖"],
    strokeCount: 6,
    radical: "氵"
  },
  "河": {
    char: "河",
    pinyin: "hé",
    audioText: "河",
    words: ["黄河", "河水", "河流", "河岸", "河面", "河北", "河西", "河滩"],
    strokeCount: 8,
    radical: "氵"
  },
  "湖": {
    char: "湖",
    pinyin: "hú",
    audioText: "湖",
    words: ["湖水", "湖面", "湖边", "湖泊", "湖岸", "湖南", "湖北"],
    strokeCount: 12,
    radical: "氵"
  },
  "海": {
    char: "海",
    pinyin: "hǎi",
    audioText: "海",
    words: ["海水", "海面", "海边", "海洋", "海浪", "海风", "海鸟", "海龟"],
    strokeCount: 10,
    radical: "氵"
  },
  "田": {
    char: "田",
    pinyin: "tián",
    audioText: "田",
    words: ["田地", "农田", "田里", "田间", "田野", "田园", "种田", "油田"],
    strokeCount: 5,
    radical: "田"
  },
  "园": {
    char: "园",
    pinyin: "yuán",
    audioText: "园",
    words: ["园林", "园子", "园地", "花园", "校园", "公园", "果园", "菜园"],
    strokeCount: 10,
    radical: "囗"
  },
  "家": {
    char: "家",
    pinyin: "jiā",
    audioText: "家",
    words: ["家人", "回家", "家乡", "家庭", "家务", "家伙", "国家"],
    strokeCount: 10,
    radical: "宀"
  },
  "门": {
    char: "门",
    pinyin: "mén",
    audioText: "门",
    words: ["门口", "门牙", "大门", "开门", "关门", "门铃", "入门", "射门"],
    strokeCount: 3,
    radical: "门"
  },
  "窗": {
    char: "窗",
    pinyin: "chuāng",
    audioText: "窗",
    words: ["窗户", "窗口", "窗花", "窗帘", "窗台", "门窗", "天窗", "橱窗"],
    strokeCount: 12,
    radical: "穴"
  },
  "房": {
    char: "房",
    pinyin: "fáng",
    audioText: "房",
    words: ["房子", "房间", "房东", "房价", "厂房", "库房", "洞房"],
    strokeCount: 8,
    radical: "户"
  },
  "车": {
    char: "车",
    pinyin: "chē",
    audioText: "车",
    words: ["汽车", "火车", "车站", "车轮", "车灯", "车库", "车队", "车道"],
    strokeCount: 4,
    radical: "车"
  },
  "船": {
    char: "船",
    pinyin: "chuán",
    audioText: "船",
    words: ["船只", "船舱", "船上", "帆船", "木船", "渔船", "渡船", "飞船"],
    strokeCount: 11,
    radical: "舟"
  },
  "飞": {
    char: "飞",
    pinyin: "fēi",
    audioText: "飞",
    words: ["飞机", "飞行", "飞船", "飞鸟", "飞快", "飞走", "起飞", "飞驰"],
    strokeCount: 3,
    radical: "飞"
  },
  "机": {
    char: "机",
    pinyin: "jī",
    audioText: "机",
    words: ["飞机", "机器", "手机", "计算机", "机箱", "机会", "机关"],
    strokeCount: 6,
    radical: "木"
  },
  "电": {
    char: "电",
    pinyin: "diàn",
    audioText: "电",
    words: ["电话", "电视", "电脑", "电影", "电灯", "电梯", "电力", "电报"],
    strokeCount: 5,
    radical: "田"
  },
  "光": {
    char: "光",
    pinyin: "guāng",
    audioText: "光",
    words: ["光明", "光彩", "眼光", "阳光", "灯光", "光阴", "光滑", "光临"],
    strokeCount: 6,
    radical: "儿"
  },
  "声": {
    char: "声",
    pinyin: "shēng",
    audioText: "声",
    words: ["声音", "声调", "歌声", "笑声", "大声", "名声", "声明"],
    strokeCount: 7,
    radical: "士"
  },
  "音": {
    char: "音",
    pinyin: "yīn",
    audioText: "音",
    words: ["音乐", "音调", "声音", "拼音", "音节", "音色", "音响", "音标"],
    strokeCount: 9,
    radical: "音"
  },
  "乐": {
    char: "乐",
    pinyin: "lè",
    audioText: "乐",
    words: ["快乐", "乐意", "乐观", "乐章", "娱乐", "逗乐", "取乐", "享乐"],
    strokeCount: 5,
    radical: "丿"
  },
  "歌": {
    char: "歌",
    pinyin: "gē",
    audioText: "歌",
    words: ["歌曲", "歌声", "歌词", "歌谣", "山歌", "歌剧", "歌手", "民歌"],
    strokeCount: 14,
    radical: "欠"
  },
  "舞": {
    char: "舞",
    pinyin: "wǔ",
    audioText: "舞",
    words: ["跳舞", "舞台", "舞步", "舞姿", "舞曲", "舞弊", "舞厅", "舞蹈"],
    strokeCount: 14,
    radical: "夕"
  },
  "画": {
    char: "画",
    pinyin: "huà",
    audioText: "画",
    words: ["图画", "画卷", "画家", "画报", "画板", "画笔", "画图", "刻画"],
    strokeCount: 8,
    radical: "田"
  },
  "课": {
    char: "课",
    pinyin: "kè",
    audioText: "课",
    words: ["课堂", "课本", "课程", "课间", "课时", "上课", "下课", "补课"],
    strokeCount: 10,
    radical: "讠"
  },
  "作": {
    char: "作",
    pinyin: "zuò",
    audioText: "作",
    words: ["作业", "作文", "作为", "工作", "操作", "制作", "协作", "发作"],
    strokeCount: 7,
    radical: "亻"
  },
  "业": {
    char: "业",
    pinyin: "yè",
    audioText: "业",
    words: ["作业", "毕业", "专业", "企业", "行业", "业绩", "业务"],
    strokeCount: 5,
    radical: "业"
  },
  "文": {
    char: "文",
    pinyin: "wén",
    audioText: "文",
    words: ["文字", "文化", "文学", "文章", "文件", "文明", "天文", "中文"],
    strokeCount: 4,
    radical: "文"
  },
  "数": {
    char: "数",
    pinyin: "shù",
    audioText: "数",
    words: ["数学", "数字", "数数", "多数", "少数", "无数", "岁数", "数据"],
    strokeCount: 13,
    radical: "攵"
  },
  "生": {
    char: "生",
    pinyin: "shēng",
    audioText: "生",
    words: ["学生", "生活", "生命", "生日", "生长", "生病", "一生"],
    strokeCount: 5,
    radical: "生"
  },
  "老": {
    char: "老",
    pinyin: "lǎo",
    audioText: "老",
    words: ["老师", "老人", "老板", "老鼠", "老马", "古老", "年老", "老少"],
    strokeCount: 6,
    radical: "老"
  },
  "师": {
    char: "师",
    pinyin: "shī",
    audioText: "师",
    words: ["老师", "教师", "师傅", "大师", "工程师", "律师", "医师"],
    strokeCount: 6,
    radical: "巾"
  }
}

import { generateHanziDetail } from "./hanziGenerator"

export function getHanziDetail(char: string): HanziDetail | null {
  // First check local data
  if (hanziData[char]) {
    return hanziData[char]
  }

  // Try to auto-generate
  return generateHanziDetail(char)
}

export function isValidChineseChar(char: string): boolean {
  const regex = /^[\u4e00-\u9fa5]$/
  return regex.test(char)
}
