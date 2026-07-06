export interface HighSchool {
  id: string;
  name: string;
  alias: string;
  district: string;
  level: string; // e.g. "市五所" / "区首选" / "市级重点"
  address: string;
  history: string;
  features: string[];
  recommendationStar: number; // 1-5
  description: string;
  badge: string; // e.g. "百年名校", "清北摇篮"
  coordinate: { x: number; y: number }; // For city center map or full map
  isCentral: boolean; // true if inside 市内六区
  coordinatesFull: { x: number; y: number }; // For full map
  motto: string;
}

export interface TransportHub {
  name: string;
  type: 'train' | 'airport';
  district: string;
  address: string;
  directionFromCenter: string;
  coordinateCentral?: { x: number; y: number };
  coordinateFull: { x: number; y: number };
}

export interface Delicacy {
  name: string;
  type: string;
  description: string;
  recommendedPlaces: string[];
  coordinateCentral?: { x: number; y: number };
  coordinateFull: { x: number; y: number };
}

export interface PhotoSpot {
  name: string;
  description: string;
  bestTime: string;
  coordinateCentral?: { x: number; y: number };
  coordinateFull: { x: number; y: number };
}

export const HIGH_SCHOOLS: HighSchool[] = [
  // 市五所 (The elite top 5)
  {
    id: "nankai",
    name: "天津市南开中学",
    alias: "南开中学",
    district: "南开区",
    level: "市五所 / 国家级示范校",
    address: "天津市南开区南开二纬路22号",
    history: "创建于1904年，由著名爱国教育家严修、张伯令创办，是南开系列学校的发祥地。",
    features: ["公能日新牌坊", "周恩来纪念馆", "话剧与辩论传统", "自主命题研究"],
    badge: "百年巨擘・伟人母校",
    recommendationStar: 5,
    isCentral: true,
    coordinate: { x: 230, y: 300 },
    coordinatesFull: { x: 370, y: 485 },
    motto: "允公允能，日新月异",
    description: "南开中学是享誉海内外的百年名校，也是敬爱的周恩来总理的母校。学校底蕴极其深厚，校园内保留着青砖红瓦的历史建筑，古朴优雅。学校倡导“公能”教育，在培养学生拔尖创新、学术科研及领袖气质上冠绝津门。每年考入清华、北京大学及世界名校的学生人数均名列前茅。"
  },
  {
    id: "yizhong",
    name: "天津市第一中学",
    alias: "天津一中",
    district: "和平区",
    level: "市五所 / 顶尖公办",
    address: "天津市和平区西安道117号",
    history: "组建于1947年，前身为天津市立中学，是新中国成立后天津市重建的第一所公办中学。",
    features: ["严谨治学", "极高的一本率", "理科竞赛强校", "五育并举教育"],
    badge: "津门翘楚・学风纯正",
    recommendationStar: 5,
    isCentral: true,
    coordinate: { x: 330, y: 380 },
    coordinatesFull: { x: 380, y: 495 },
    motto: "礼、义、廉、耻、贤",
    description: "天津一中以极其纯正的学风、严谨的教学管理和傲视全省的高考成绩而闻名。一中不仅理科竞赛极其强势，高考特控线（一本线）上线率长期保持在98%以上，几乎人人能上重点大学。学校位于和平区核心地带，师资力量极强，是津门学子心中神圣的学术殿堂。"
  },
  {
    id: "yaohua",
    name: "天津市耀华中学",
    alias: "耀华中学",
    district: "和平区",
    level: "市五所 / 历史名校",
    address: "天津市和平区南京路106号",
    history: "创办于1927年，初名天津公学，后由庄乐峰先生倡议更名为“耀华”，寓意“光耀中华”。",
    features: ["耀华红砖礼堂", "超常介物理班", "百年古建筑群", "南京路繁华校区"],
    badge: "光耀中华・精英摇篮",
    recommendationStar: 5,
    isCentral: true,
    coordinate: { x: 420, y: 310 },
    coordinatesFull: { x: 390, y: 485 },
    motto: "勤、朴、忠、勇",
    description: "耀华中学坐落于繁华的南京路旁，其标志性的红砖欧式建筑群优雅经典。学校拥有悠久的物理、数学实验班传统，在超常儿童教育和个性化拔尖人才培养上经验丰富。耀华中学的文化活动极其丰富，学生综合素质极高，历年高考考入C9联盟高校的人数占比极高。"
  },
  {
    id: "xinhua",
    name: "天津市新华中学",
    alias: "新华中学",
    district: "河西区",
    level: "市五所 / 法式风情",
    address: "天津市河西区马场道99号",
    history: "始建于1914年，由法籍天主教神甫创办，初名圣功学堂，1973年更名为新华中学。",
    features: ["圣功楼古建筑", "法语特色教学", "高水平交响乐团", "化学/生物竞赛"],
    badge: "圣功风骨・法外特色",
    recommendationStar: 5,
    isCentral: true,
    coordinate: { x: 490, y: 410 },
    coordinatesFull: { x: 395, y: 495 },
    motto: "团结、勤奋、求实、创新",
    description: "新华中学坐落于风光旖旎的五大道风情区马场道。学校完美继承了“圣功学堂”的高贵品质和历史风骨，是天津市唯一开设法文班、与法国名校有直接交流的重点高中。新华中学的教学水平常年位列全市前五，且文理并重，校园氛围充满着典雅的人文艺术气息。"
  },
  {
    id: "shiyan",
    name: "天津市实验中学",
    alias: "实验中学",
    district: "河西区",
    level: "市五所 / 国际视野",
    address: "天津市河西区平山道1号",
    history: "创建于1923年，前身是由著名爱国人士创办的天津私立沧州中学，后曾更名为天津市第十七中学。",
    features: ["蔚蓝色的校色", "中德/中英双语班", "科技创新实验室", "足球与田径强校"],
    badge: "求实创新・国际接轨",
    recommendationStar: 5,
    isCentral: true,
    coordinate: { x: 380, y: 490 },
    coordinatesFull: { x: 385, y: 505 },
    motto: "实事求是，自强不息",
    description: "天津实验中学是天津极具活力与现代化气息的高端名校。学校拥有世界一流水准的校园硬软件设施和先进的国际化办学特色。作为天津中外合作办学的典范，其实验班的高考成绩逼近一中南开。实验中学的社团极其活跃，素质教育与应试成绩结合得极其完美。"
  },
  
  // 市内六区其他顶级高中 (Other core district top schools)
  {
    id: "ershi",
    name: "天津市第二十中学",
    alias: "二十中学",
    district: "和平区",
    level: "和平三强 / 市级重点",
    address: "天津市和平区湖北路59号",
    history: "由私立民立二十中学和天津私立广东中学等合并组建而成，继承了极佳的外语和美育基因。",
    features: ["英国维多利亚式主楼", "小班英语特色", "卓越的管乐团", "五大道英伦风情"],
    badge: "英伦校舍・美育强校",
    recommendationStar: 4.5,
    isCentral: true,
    coordinate: { x: 460, y: 350 },
    coordinatesFull: { x: 390, y: 495 },
    motto: "躬行求真，志高致远",
    description: "二十中学位于和平区五大道，校区内的老英式建筑极其优雅，爬满爬山虎的红墙透着浓郁的学术气息。二十中凭借和平区得天独厚的生源和极其高超的教学加工能力，一本率和清北率稳居全市前列。其小班英语教学和艺术管乐特色深受家长赞誉。"
  },
  {
    id: "sizhong",
    name: "天津市第四中学",
    alias: "天津四中",
    district: "河西区",
    level: "河西三强 / 市级重点",
    address: "天津市河西区隆昌路14号",
    history: "始建于1954年，是河西区仅次于新华和实验的“第三极”标杆高中。",
    features: ["精细化班级管理", "极高的高考增值度", "现代智能化校园", "扎实的基础教学"],
    badge: "低进高出・拼搏典范",
    recommendationStar: 4.5,
    isCentral: true,
    coordinate: { x: 520, y: 520 },
    coordinatesFull: { x: 400, y: 510 },
    motto: "厚德、博学、求实、尚美",
    description: "天津四中以“精细管理、高加工增值”而享誉津门。学校校风极其务实、严格，致力于帮助每位学子实现中考成绩向高考成绩的最大跨越。四中的高考高分段人数近年迅速攀升，牢牢锁住河西区前三甲位置，是众多追求稳健、踏实学风家长的首选。"
  },
  {
    id: "qizhong",
    name: "天津市第七中学",
    alias: "天津七中",
    district: "河东区",
    level: "河东首选 / 市级重点",
    address: "天津市河东区成林道119号",
    history: "创建于1951年，是新中国成立后天津市最早建立的重点中学之一，也是河东区的教育旗舰。",
    features: ["河东教育排头兵", "超万平米体育馆", "航天科普基地", "硬核师资力量"],
    badge: "河东旗舰・功底深厚",
    recommendationStar: 4.5,
    isCentral: true,
    coordinate: { x: 570, y: 260 },
    coordinatesFull: { x: 410, y: 485 },
    motto: "立德树人，追求卓越",
    description: "天津七中是河东区教育界毫无争议的“老大哥”。学校教学风格稳健硬朗，对生源的雕琢极其用心。七中拥有一流的现代化实验中心和航天科普教育资源，其高考一本上线率在河东区常年高居第一，甚至能与部分市五所高中一较高下，性价比极高。"
  },
  {
    id: "erzhong",
    name: "天津市第二中学",
    alias: "天津二中",
    district: "河北区",
    level: "河北首选 / 市级重点",
    address: "天津市河北区昆纬路109号",
    history: "创办于1947年，由著名的教育家、翻译家创办，是河北区重点中学的领头羊。",
    features: ["河北区最强校", "地学/气象特色科普", "科技社团活跃", "现代化智慧图书馆"],
    badge: "海河文脉・河北标杆",
    recommendationStar: 4,
    isCentral: true,
    coordinate: { x: 480, y: 160 },
    coordinatesFull: { x: 395, y: 470 },
    motto: "敬业、博学、严谨、创新",
    description: "天津二中是河北区最顶尖的学府。学校不仅高考特控率极高，而且注重科技创新和素质拓展，建有省级标准的气象地学实验室。二中地理位置极好，紧邻中山路商业区，交通便利。老师关爱学生，学习氛围积极向上，是河北区学子的首选殿堂。"
  },
  {
    id: "sanzhong",
    name: "天津市第三中学",
    alias: "天津三中",
    district: "红桥区",
    level: "红桥首选 / 历史底蕴",
    address: "天津市红桥区向阳路112号",
    history: "创建于1901年，前身为天津县立中学，是天津历史上第一所公办现代中学。",
    features: ["百年钟楼", "陶行知教育思想", "国学与诗词社", "勤俭朴实学风"],
    badge: "官立首创・百年桃李",
    recommendationStar: 4,
    isCentral: true,
    coordinate: { x: 260, y: 180 },
    coordinatesFull: { x: 365, y: 470 },
    motto: "乐群、敬业、求实、创新",
    description: "天津三中是天津最早的现代公立学校。学校不仅带有鲜明的历史文化厚重感，钟楼与古典连廊交错。三中校风极其朴素，注重学生品德和持之以恒学习力的塑造。学校在红桥区办学水平首屈一指，历届高考中均能向名牌大学输送大量优秀人才。"
  },
  {
    id: "haihe",
    name: "天津市海河中学",
    alias: "海河中学",
    district: "河西区",
    level: "百年底蕴 / 市级重点",
    address: "天津市河西区南京路与大沽南路交口",
    history: "始建于1895年，前身为北洋大学堂备斋（德文学堂），是近代中国最早的西式学校之一。",
    features: ["德语历史渊源", "海河畔红砖尖顶", "信息科技奥赛", "海河文化艺术节"],
    badge: "北洋余晖・德风古韵",
    recommendationStar: 4.2,
    isCentral: true,
    coordinate: { x: 530, y: 350 },
    coordinatesFull: { x: 400, y: 495 },
    motto: "博学、慎思、笃行",
    description: "海河中学是一所底蕴十分独特的西式建筑校区。它位于海河之畔，拥有长达130年的办学足迹。学校继承了德语和信息技术的优良传统，近几年在机器人和奥林匹克信息竞赛中斩获多项大奖。高考成绩稳步提升，是河西区教育质量优、校园极美的典范。"
  },
  {
    id: "fortyfive",
    name: "天津市第四十五中学",
    alias: "四十五中",
    district: "河东区",
    level: "河东两强 / 市级重点",
    address: "天津市河东区广宁路15号",
    history: "创办于1954年，是河东区重点建设的优质高中，有着非常好的社区口碑。",
    features: ["国防教育特色班", "学生心理辅导示范", "田径体育特长", "书香墨气校园"],
    badge: "文武双全・国防先锋",
    recommendationStar: 4,
    isCentral: true,
    coordinate: { x: 630, y: 330 },
    coordinatesFull: { x: 415, y: 500 },
    motto: "求实、创新、和谐、发展",
    description: "第四十五中学是河东区排名紧随七中的优质高中。学校以国防教育与纪律严明见长，开设有特色国防班。学校不仅学习氛围浓厚，并且注重学生的身心健康与生涯规划。近十年来，其教学增值能力极强，中考分数并不极其耀眼的同学在这里常能考取理想的一本高校。"
  },

  // 远郊及环城各区教育天花板 (Outer & suburban district high school kings)
  {
    id: "yangcun",
    name: "天津市武清区杨村第一中学",
    alias: "杨村一中",
    district: "武清区",
    level: "郊区之王 / 超级高中",
    address: "天津市武清区泉兴路与雍阳西道交口",
    history: "始建于1951年，是武清区教育的最高名片，也是享誉华北的超级重本摇篮。",
    features: ["极其庞大的清北梯队", "半军事化管理", "极其宏伟的现代校区", "全天津最卷学风"],
    badge: "超级高中・清北摇篮",
    recommendationStar: 5,
    isCentral: false,
    coordinate: { x: 260, y: 280 }, // Schematic
    coordinatesFull: { x: 280, y: 320 },
    motto: "志存高远，自强不息",
    description: "杨村一中是天津市郊区重点中无可替代的“神校”，常年与市五所平起平坐，甚至在高考重本率上超越部分市五所。学校实施高强度、极度专注的学习管理模式，吸引了全天津乃至华北各地的顶尖学子。每年的清华北大录取人数高达数十人，一本率超95%，是当之无愧的学霸大本营。"
  },
  {
    id: "baodi",
    name: "天津市宝坻区第一中学",
    alias: "宝坻一中",
    district: "宝坻区",
    level: "京东名校 / 超级高中",
    address: "天津市宝坻区建设路西端",
    history: "创建于1920年，前身是宝坻县立初级中学，底蕴悠久，人才辈出。",
    features: ["宝坻教育之光", "超级一本大户", "儒家文化底蕴", "超大生态园林校园"],
    badge: "宝坻脊梁・英才汇聚",
    recommendationStar: 4.8,
    isCentral: false,
    coordinate: { x: 560, y: 220 },
    coordinatesFull: { x: 570, y: 230 },
    motto: "敬业、乐群、博学、慎思",
    description: "宝坻一中是一所百年园林式超级学府。学校占地面积宽广，学习环境幽静怡人。宝坻一中以极其朴实吃苦的精神闻名，其高考高分段段人数和清北人数在天津北部各区首屈一指。学校倡导德智双修，管理井井有条，是整个宝坻区及周边家长最为信赖的名校。"
  },
  {
    id: "jizhou",
    name: "天津市蓟州区第一中学",
    alias: "蓟州一中",
    district: "蓟州区",
    level: "蓟州之巅 / 市级重点",
    address: "天津市蓟州区文昌街5号",
    history: "始建于1941年，原名蓟县一中，是盘山脚下最亮眼的文化地标与英才摇篮。",
    features: ["背靠盘山地灵人杰", "全封闭寄宿制", "硬核理科班", "红色革命历史传承"],
    badge: "盘山英杰・燕赵风骨",
    recommendationStar: 4.7,
    isCentral: false,
    coordinate: { x: 400, y: 120 },
    coordinatesFull: { x: 420, y: 110 },
    motto: "团结、拼搏、求实、创新",
    description: "蓟州一中屹立于天津最北部的蓟州区，被群山环抱，空气清新、环境极其适合潜心苦读。学校实施高效能的全封闭寄宿制管理，师生同吃同住，感情深厚。蓟州一中的理科实力在全天津远郊中享有极高声誉，历届高考中一本率和名校录取比例均为全区翘楚。"
  },
  {
    id: "jinghai",
    name: "天津市静海区第一中学",
    alias: "静海一中",
    district: "静海区",
    level: "静海明珠 / 市级重点",
    address: "天津市静海区静海镇迎宾大道",
    history: "创办于1911年，清末名臣倡议设立，历经百年，是天子津沽南大门的学术担当。",
    features: ["南华英才摇篮", "全国体育排球基地", "研究性学习先驱", "全封闭生态校园"],
    badge: "沽上南门・百年砥砺",
    recommendationStar: 4.7,
    isCentral: false,
    coordinate: { x: 200, y: 740 },
    coordinatesFull: { x: 200, y: 730 },
    motto: "厚德、笃学、健美、超越",
    description: "静海一中是天津南部地区的重点高中霸主。不仅高考录取质量名列全市前茅，还是享誉全国的青少年排球训练基地，可谓文体两开花。静海一中以极其扎实系统的复习体系和备考策略著称，对中高考政策的研究十分透彻，一本率稳居90%以上，年年向顶尖C9高校输送大批人才。"
  },
  {
    id: "tanggu",
    name: "天津市塘沽第一中学",
    alias: "塘沽一中",
    district: "滨海新区",
    level: "滨海之巅 / 百年名校",
    address: "天津市滨海新区塘沽烟台街3号",
    history: "始建于1946年，前身为私立津沽中学塘沽分校，是滨海新区历史最久、实力最强的金牌高中。",
    features: ["滨海教育一号帆", "理科竞赛滨海第一", "潮汐文化长廊", "百年红砖历史底蕴"],
    badge: "滨海龙头・百年潮涌",
    recommendationStar: 4.9,
    isCentral: false,
    coordinate: { x: 720, y: 540 },
    coordinatesFull: { x: 740, y: 530 },
    motto: "立德、博学、求实、求新",
    description: "塘沽一中是整个滨海新区当之无愧的教育皇冠。学校坐落于塘沽核心街区，师资力量极强，在五大学科竞赛及高考高分段培养上在滨海处于绝对垄断地位。塘一中的校园文化具有鲜明的“海洋与潮汐”特色，倡导开放开阔的胸怀。其教学水准完全可以并肩甚至超越市内部分“市五所”高中。"
  },
  {
    id: "dagang",
    name: "天津市大港第一中学",
    alias: "大港一中",
    district: "滨海新区",
    level: "滨海名校 / 石化重镇",
    address: "天津市滨海新区大港迎宾街251号",
    history: "始建于1981年，伴随着大港油田和石化基地的崛起而创建，是一所极具拼搏精神的重点校。",
    features: ["石油油田子弟兵精神", "一流寄宿宿舍", "全国化学奥赛基地", "高科技智慧物理舱"],
    badge: "油田之光・开拓创新",
    recommendationStar: 4.5,
    isCentral: false,
    coordinate: { x: 700, y: 700 },
    coordinatesFull: { x: 710, y: 710 },
    motto: "严谨、博学、求实、奉献",
    description: "大港一中是滨海新区南片（大港）的最佳高中。伴随着大港油田的奋斗文化成长，学校继承了石油人顽强拼搏、科学严谨的基因。学校尤其在化学、物理实验教育上具有全国领先的硬件设备。大港一中校风极其踏实，学生专注度极高，重本率常年保持在85%以上。"
  },
  {
    id: "yangliuqing",
    name: "天津杨柳青第一中学",
    alias: "杨柳青一中",
    district: "西青区",
    level: "西青标杆 / 运河文脉",
    address: "天津市西青区杨柳青镇柳口路39号",
    history: "创办于1944年，坐落在京杭大运河畔、千年古镇杨柳青，饱含浓郁的地方非遗文化色彩。",
    features: ["大运河畔书香", "年画文化传承基地", "高效生本课堂", "运河文化艺术节"],
    badge: "古镇文脉・年画遗风",
    recommendationStar: 4.3,
    isCentral: false,
    coordinate: { x: 220, y: 520 },
    coordinatesFull: { x: 240, y: 530 },
    motto: "厚德、笃学、和谐、奋进",
    description: "杨柳青一中是西青区实力最强的排头兵高中。学校坐落于著名的杨柳青古镇，将运河文化与杨柳青木版年画非遗艺术融入到日常校园生活与德育中。杨柳青一中近年来高考特控线上线率大幅连年攀升，学校课堂教学方法先进，学风极其淳朴，是西青区学子梦寐以求的最高学府。"
  },
  {
    id: "xianshuigu",
    name: "天津市咸水沽第一中学",
    alias: "咸水沽一中",
    district: "津南区",
    level: "津南标杆 / 生态名校",
    address: "天津市津南区咸水沽镇丰收路",
    history: "始建于1941年，是海河南岸津南教育的摇篮，也是培养大批海河英才的阵地。",
    features: ["津南教育旗舰", "现代低碳示范校园", "多元社团自主管理", "硬核数理培优"],
    badge: "津南金牌・沽水学堂",
    recommendationStar: 4.3,
    isCentral: false,
    coordinate: { x: 500, y: 620 },
    coordinatesFull: { x: 490, y: 610 },
    motto: "砺志、厚德、博学、创新",
    description: "咸水沽一中是津南区最优秀的重点高中。学校近几年投资数亿元新建了高标准、生态低碳的智慧化校园。咸水沽一中采用“导师制”对尖子生进行重点培优，在数理化等学科的高考提分幅度上极有成效。学校不仅管理严格规范，且校园环境优美，是海河教育园区旁实力硬核的区属天花板。"
  }
];

export const TRANSPORT_HUBS: TransportHub[] = [
  {
    name: "天津站 (天津东站)",
    type: "train",
    district: "河北区/河东区交界",
    address: "天津市河北区新纬路1号(海河畔)",
    directionFromCenter: "市中心核心地带，紧邻海河，至和平、河西高中的直达地铁极多(地铁1,2,3号线枢纽)",
    coordinateCentral: { x: 440, y: 220 },
    coordinateFull: { x: 395, y: 480 }
  },
  {
    name: "天津西站",
    type: "train",
    district: "红桥区",
    address: "天津市红桥区西站前街1号",
    directionFromCenter: "市中心西北部，是京沪高铁的主要停靠站，乘地铁1、6号线直达五大道及南开学区",
    coordinateCentral: { x: 230, y: 120 },
    coordinateFull: { x: 360, y: 465 }
  },
  {
    name: "天津南站",
    type: "train",
    district: "西青区",
    address: "天津市西青区柳口路南端",
    directionFromCenter: "市区西南部，主要承载京沪高铁。乘坐地铁3号线可直达南开大学、营口道五大道学区",
    coordinateFull: { x: 250, y: 590 }
  },
  {
    name: "天津滨海国际机场",
    type: "airport",
    district: "东礼区",
    address: "天津市东丽区机场大道",
    directionFromCenter: "市区东部约15公里，有地铁2号线直通市中心及天津火车站，交通极便利",
    coordinateFull: { x: 550, y: 480 }
  }
];

export const DELICACIES: Delicacy[] = [
  {
    name: "天津煎饼馃子",
    type: "经典早餐",
    description: "绿豆面摊成的薄饼，打上鸡蛋，卷上馃子(油条)或馃篦儿，撒上面酱、腐乳、葱花。天津煎饼绝不加生菜或香肠，这才是纯正的卫嘴子风味！",
    recommendedPlaces: ["南开区二纬路清真煎饼", "和平区鞍山道煎饼"],
    coordinateCentral: { x: 200, y: 340 },
    coordinateFull: { x: 375, y: 490 }
  },
  {
    name: "天津锅巴菜 (嘎巴菜)",
    type: "经典早餐",
    description: "将绿豆小米面摊成的薄片切成条，浸入由八角、酱油等熬制的素卤中，再浇上芝麻酱、腐乳汁、香菜、辣油，口感爽滑，清香爽口。",
    recommendedPlaces: ["大福来锅巴菜", "真素诚锅巴菜"],
    coordinateCentral: { x: 300, y: 240 },
    coordinateFull: { x: 380, y: 480 }
  },
  {
    name: "耳朵眼炸糕",
    type: "津门三绝",
    description: "始创于清光绪年间，用优质糯米作皮，赤小豆、白糖制成红豆沙作馅，油炸而成。外皮金黄酥脆，内里绵软粘糯，甜而不腻。",
    recommendedPlaces: ["耳朵眼炸糕总店(鼓楼)"],
    coordinateCentral: { x: 320, y: 190 },
    coordinateFull: { x: 385, y: 475 }
  },
  {
    name: "十八街麻花",
    type: "津门三绝",
    description: "桂发祥十八街麻花是用优质面粉、桂花、闽姜、核桃仁等多种辅料精制。每个麻花中心夹有一条各种辅料配制的酥馅，香甜酥脆。",
    recommendedPlaces: ["桂发祥十八街麻花总店"],
    coordinateCentral: { x: 560, y: 450 },
    coordinateFull: { x: 405, y: 505 }
  }
];

export const PHOTO_SPOTS: PhotoSpot[] = [
  {
    name: "天津之眼摩天轮",
    description: "跨海河而建、桥轮合一的雄伟摩天轮，是天津首屈一指的地标。夜晚灯光璀璨，极其壮丽，是合影和打卡的必去之地。",
    bestTime: "19:00 - 21:30 (亮灯夜景最佳)",
    coordinateCentral: { x: 360, y: 80 },
    coordinateFull: { x: 380, y: 460 }
  },
  {
    name: "五大道风情区",
    description: "汇聚英、法、德、意等国2000多座风格迥异的西洋历史别墅，马车、绿荫、红墙交织。这里也紧邻天津一中、二十中，充满书香与欧式浪漫气息。",
    bestTime: "春秋两季午后，阳光洒在老墙爬山虎上最动人",
    coordinateCentral: { x: 420, y: 430 },
    coordinateFull: { x: 390, y: 500 }
  },
  {
    name: "解放桥与津湾广场",
    description: "全钢结构可开启的老解放桥，桥对岸即是巴洛克风情的津湾广场。夜晚的海河水波倒映着摩天大楼与欧式尖顶，犹如塞纳河畔。",
    bestTime: "20:00 - 22:00 (海河沿岸夜景游船开动时)",
    coordinateCentral: { x: 480, y: 240 },
    coordinateFull: { x: 395, y: 485 }
  }
];

export const PRACTICAL_GUIDES = {
  updateTime: "2026年5月最新编制",
  sections: [
    {
      title: "🎯 天津高考政策优势大揭秘",
      content: "天津高考一直以来被视作高考的“福地”：\n1. **极高的一本与名校率**：天津的985、211重点大学录取比例在全国各省市中位列第一梯队，竞争烈度远低于邻近省份。\n2. **自主命题卷**：天津采用独立命题（天津卷），试卷难度梯级设计极其科学合理，更注重考察基础和思维，极少出现偏题怪题。\n3. **新高考‘3+3’模式**：语数外三科必考，外语提供两次考试机会。选考科目（物理、化学、生物、历史、地理、政治）任选3科，实行等级赋分制，极大释放了学生的学科特长。"
    },
    {
      title: "🏫 天津中考与“市五所”报考必读",
      content: "1. **市五所的江湖地位**：南开、一中、耀华、新华、实验被誉为“天津高中的五大顶流”。其清北率、重本率处于绝对领先地位。\n2. **指标生名额分配**：为促进教育公平，天津市五所及各区重点高中会将一定比例（通常为50%）的招生名额，直接定向分配到本区内的各个初中，按指标生降分或优先录取，给普通初中的孩子入读顶级名校的绝佳机会。\n3. **市内六区‘统招互通’**：市内六区（和平、河西、南开、河东、河北、红桥）的中考生可以跨区报考市内六区内的任何高中。而郊区（武清、宝坻等）的学生主要报考本区高中的优质名牌（如杨村一中、宝坻一中），形成了‘市区集群’与‘郊区神校’双足鼎立的经典格局。"
    },
    {
      title: "🔑 转学落户与学籍、房产约束",
      content: "1. **高考报名资格‘双三年’要求**：根据天津最新政策，外省市户籍迁入天津的考生，要在天津参加高考，必须满足‘三年天津户籍+三年天津高中学籍且在学’的要求，严厉打击了‘高考移民’，保障了常住居民和真实转学家庭的权益。\n2. **和平区‘三年房产锁学区’**：和平区（一中、耀华、二十中所在地，天津教育最高峰）政策最为严苛，要求房产满三年、且落户满三年方能正常入学，部分热门小学甚至实行每户房产六年内只解决一个学位。\n3. **转学时间窗口**：高中阶段转学政策非常严格，高一、高三通常不予办理转学。高二上学期开学前，符合落户及房产条件的孩子可以申请转学，通常需要参加各区教育局组织的统一安置水平测试，按照成绩分配去向。"
    }
  ]
};
