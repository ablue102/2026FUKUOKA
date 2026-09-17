// 飯店資訊來源：使用者提供的三份訂房 PDF。僅摘錄旅行所需資訊。
TRIP.hotels={
 yufuin:{name:'Grandpia Resort YUFUIN',jp:'リゾート 湯布院',address:'〒879-5102 大分県由布市湯布院町川上2710-18',phone:'+81977339016',checkin:'09/24 16:00–21:00',checkout:'09/26 10:00 前',nights:2,room:'家庭房 · 2 大 1 小',meals:'不含餐點，早餐與晚餐需另行安排。',parking:'免費私人停車，不需預約。',notes:'房內有廚房、微波爐與冰箱；訂房單列有浴缸，未確認溫泉設施。',lat:33.265167,lon:131.365117,source:'0924-0926_C.pdf'},
 aso:{name:'阿蘇民宿 あそげん',jp:'民宿 あそげん',address:'〒869-2226 熊本県阿蘇市乙姫1506',phone:'+81967322986',checkin:'09/26 16:00–19:00',checkout:'09/27 10:00 前',nights:1,room:'日式客房 · 2 大 1 小 · 2 張日式床舖',meals:'含早餐＋晚餐；供餐時間請向住宿確認。',parking:'免費私人停車，不需預約。',notes:'入住期間付款；記得攜帶付款用卡片。公共澡堂使用規定請向住宿確認。',lat:32.934833,lon:131.04005,source:'0926-0927_C.pdf'},
 hakata:{name:'博多東急 REI 酒店',jp:'博多東急REIホテル',address:'〒812-0011 福岡県福岡市博多区博多駅前1-2-23',phone:'+81924510109',checkin:'09/27 15:00–00:00',checkout:'09/29 10:00 前',nights:2,room:'禁菸雙人房（附淋浴）· 1 張加大雙人床 · 2 大 1 小',meals:'不含餐點；訂房單載 6–12 歲兒童早餐加購 ¥1,000／日。',parking:'¥1,500／日，先到先停、無法預約；機械式限高 1.55 m、寬 2.05 m、長 5 m。',notes:'入住期間付款，住宿稅另付。Day 4 先還車再入住。',lat:33.592033,lon:130.418367,source:'0927-0929_C.pdf'}
};
TRIP.days.forEach(d=>{d.hotelId=d.day<3?'yufuin':d.day===3?'aso':d.day<6?'hakata':null;d.stayId=d.hotelId||'hakata';if(d.hotelId)d.hotel=TRIP.hotels[d.hotelId].name;});
const makeRows=(day,rows)=>rows.split('\n').map((r,i)=>{const [time,title,location,transport,duration,note]=r.split('|');return {id:`d${day}-hotel-v2-${i}`,time,title,location,transport,duration,note};});
Object.assign(TRIP.days[2],{route:'由布院 → 阿蘇 → 阿蘇住宿',driveTime:'約 2～3 小時（估算，含當地移動）',highlights:'草千里（彈性）・阿蘇住宿晚餐',timeline:makeRows(3,`07:30–08:30|早餐|由布院|用餐|—|住宿不含餐，需自行安排
08:30–09:00|整理行李＋Check-out|Grandpia Resort YUFUIN|退房|—|訂房退房期限為 10:00 前
09:00–11:00|由布院 → 阿蘇|阿蘇|開車|約 2 小時（估算）|依道路及天候調整
11:00–12:30|草千里 · 彈性行程|草千里|景點|—|CHECK：依火山警戒、道路與官方開放狀況決定是否前往
12:30–13:30|阿蘇午餐|阿蘇|用餐|—|餐廳依實際路線選擇
13:30–15:30|阿蘇周邊休息／彈性時間|阿蘇|休息|—|不另加固定景點；預留天候及移動緩衝
15:30–16:00|前往民宿|阿蘇民宿 あそげん|開車|依出發點待確認|16:00 起可入住，最晚 19:00
16:00～|Check-in＋休息|阿蘇民宿 あそげん|入住|—|入住期間付款，準備付款用卡片
供餐時間待確認|住宿晚餐|阿蘇民宿 あそげん|用餐|—|訂房包含晚餐，向住宿確認供餐時間`)});
TRIP.days[2].alternativePlan={route:'由布院 → 阿蘇可通行區域 → 午餐／休息 → 民宿 あそげん',note:'若草千里受火山、道路或天候管制，取消該站，依官方可通行路線前往阿蘇住宿。不進入管制區；16:00–19:00 辦理入住。'};
TRIP.days[2].alerts.push('住宿已依訂房改為阿蘇民宿 あそげん；今天不前往高千穗。含晚餐，請事先確認供餐及最晚抵達時間。');
Object.assign(TRIP.days[3],{route:'阿蘇 → 高千穗峽 → 高千穗神社 → 福岡／博多',driveTime:'約 5.5～6.5 小時（估算）',highlights:'阿蘇出發・高千穗・福岡還車',timeline:makeRows(4,`07:00–07:30|早餐＋退房準備|阿蘇民宿 あそげん|用餐|—|含早餐，供餐能否配合早出發待確認
07:30|Check-out|阿蘇民宿 あそげん|退房|—|今日長途移動，確認行李
07:30–09:30|阿蘇 → 高千穗峽|高千穗峽|開車|約 2 小時（估算）|山路與休息需預留彈性，出發前核對導航
09:30–10:00|停車＋前往乘船處|高千穗峽|步行|—|依停車位置調整
10:00–11:00（暫排）|高千穗峽／划船|高千穗峽|景點|—|划船以可預約時段為準；停航改步道與真名井瀑布
11:00–11:30|峽谷步道|高千穗峽|步行|—|依開放狀況與體力縮短
11:30–11:45|前往高千穗神社|高千穗神社|開車|約 15 分鐘（估算）|避免趕路
11:45–12:15|高千穗神社|高千穗神社|步行|—|如前段延誤可縮短或略過
12:15–13:00|高千穗午餐|高千穗|用餐|—|13:00 左右離開，保留還車緩衝
13:00–16:30／17:00|高千穗 → 福岡|福岡|開車|約 3.5～4 小時（估算）|包含中途休息
17:00–17:30|加油|福岡|開車|待確認|依還車據點安排
17:30–18:00（待確認）|博多附近還車|博多，還車據點待確認|還車|—|確認租車合約最晚還車時間
18:00–18:30|Check-in|博多東急 REI 酒店|入住|—|15:00 起可入住，當日先還車再入住
19:00～|博多晚餐|博多|用餐|—|飯店不含餐，依體力選擇`)});
TRIP.days[3].alerts[0]='高千穗峽划船｜9/27 星期日。改由阿蘇出發，原 08:30 早場已不適用。10:00 僅為暫排，預約制度、可預約時段、天候、水位與停航資訊待確認。';
TRIP.days[3].alerts.push('今日車程比原計畫增加約 2 小時。早餐供餐時間、山路路況、划船預約與最晚還車時間需一併核對；延誤時優先縮短神社／步道。');
TRIP.days.forEach(d=>d.timeline.forEach(t=>{if(/由布院住宿/.test(t.location))t.location=TRIP.hotels.yufuin.name;if(/博多.*住宿/.test(t.location))t.location=TRIP.hotels.hakata.name;if(d.day<=2&&t.title==='晚餐＋溫泉'){t.title='晚餐＋休息';t.note='住宿不含餐；溫泉設施未確認，不視為已含體驗。';}if(d.day<=2&&t.title.includes('早餐'))t.note+='；住宿不含早餐，需另行安排';}));
const weatherPlaces={yufu:{name:'由布院',lat:33.265,lon:131.365},safari:{name:'Safari 周邊',lat:33.389,lon:131.37},beppu:{name:'別府',lat:33.284,lon:131.491},aso:{name:'阿蘇市',lat:32.935,lon:131.04},kusa:{name:'草千里',lat:32.884,lon:131.055},taka:{name:'高千穗',lat:32.711,lon:131.307},fukuoka:{name:'福岡／博多',lat:33.59,lon:130.42}};
const dayPlaces=[['fukuoka','yufu'],['yufu','safari','beppu'],['yufu','kusa','aso'],['aso','taka','fukuoka'],['fukuoka'],['fukuoka']];
TRIP.days.forEach((d,i)=>{d.weatherLocations=dayPlaces[i].map(k=>weatherPlaces[k]);d.outfit=['飛機與車內準備薄外套；穿好走的鞋，孩子備一套替換衣物。','穿便於活動的上衣、長褲與包覆式運動鞋；攜帶帽子、薄外套及雨具。','採可增減的分層穿法，準備防風外套、長褲與抓地力好的鞋；草千里氣溫需看當地預報。','穿止滑、好走的鞋與活動方便的長褲；長途乘車備薄外套，孩子帶替換襪子。','透氣上衣、舒適鞋與輕便背包；進出冷氣空間備薄外套。','穿舒適分層衣物及方便走路的鞋，外套留在隨身行李。'][i];});

TRIP.rental={company:'Budget 汽車租賃',reference:'00010763985',pickup:{name:'福岡機場國際線店',time:'2026/09/24 12:00',map:'https://maps.app.goo.gl/6tvbrgiiSdbATrKg9',website:'https://www.budgetrentacar.co.jp/zh/shop/0139/',phone:'+81927105922',access:'前往福岡機場國際航廈 1 樓租車公司電話服務台辦理接待，再由門市接駁至取車地點。此店不在國內線一側；無法完成接待時撥打門市電話。'},dropoff:{name:'博多站前店',time:'2026/09/27 18:30',map:'https://goo.gl/maps/K7m8mRukgtXdc7T86',website:'https://www.budgetrentacar.co.jp/zh/shop/0023/',access:'依預約單：從博多口旁交通中心出來，往博多站前 1 丁目路口、NISHITETSU HOTEL CROOM 博多右側的 JR 博多 City 合作停車場方向；實際還車入口依門市指示。'},duration:'78 小時 30 分鐘',car:'SUV2 · 禁菸車',options:'ETC 卡 ¥330、增高座椅 ¥1,100（已預約）',coverage:'訂單列免責賠償費用 ¥10,120；保障範圍以租車合約為準。',total:'¥44,220',discount:'長期租車優惠活動',notes:'訂單列基本收費 ¥54,450、異地還車費「無」。總額依預約單列示；折扣明細未列，不以項目直接加總推算。',luggage:'2 個 28 吋＋1 個 20 吋行李箱；SUV2 為車級，實際車款與行李容納空間仍需向門市確認。',source:'[ Budget汽車租賃 ] 非常感謝您的預約.pdf'};
TRIP.checklist[0]='ETC 卡已預約／取車時確認';TRIP.checklist[2]='增高座椅已預約／取車時確認';TRIP.checklist[7]='12:00 取車與航班銜接確認';
TRIP.days[0].alerts[0]='取車時間衝突／待確認：BR106 11:20 抵達福岡，Budget 訂單取車時間為 12:00，僅留 40 分鐘辦理入境、領行李與接駁。請事先向門市確認銜接安排；本 App 未更改預約。';
TRIP.days[0].alerts.push('依租車預約信：超過預約時間僅保留 1 小時，不會隨航班自動調整；逾時 1 小時以上且未聯繫可能視為取消。若有延誤，請立即聯絡國際線門市 +81 92-710-5922。');
TRIP.days[0].timeline.forEach(t=>{if(t.title.includes('前往租車公司')){t.location='Budget 福岡機場國際線店';t.note='前往國際航廈 1 樓租車電話服務台辦理接待後搭接駁。預估時段晚於訂單 12:00，需先與門市確認。';}if(t.title==='辦理取車'){t.time='12:00 預約／實際待確認';t.location='Budget 福岡機場國際線店';t.note='此為訂單時間，非保證可抵達時間；ETC 卡、增高座椅已預約，現場確認車況、保障與行李空間。';}if(t.title==='福岡出發')t.note='13:20 為行程估算，僅在門市確認取車銜接可行後適用。';});
TRIP.days[3].alerts[2]='Budget 博多站前店還車時間已確認為 9/27 18:30。行程暫以 17:30–18:00 辦理還車，預留緩衝；先加油，再依門市指定入口還車。';
TRIP.days[3].alerts[TRIP.days[3].alerts.length-1]='今日車程比原計畫增加約 2 小時。請核對早餐、山路路況及划船預約，並以 18:30 預約還車為限制；延誤時優先縮短神社／步道。';
TRIP.days[3].timeline.forEach(t=>{if(t.title.includes('附近還車')){t.time='17:30–18:00（預留緩衝）';t.title='Budget 博多站前店還車';t.location='Budget 博多站前店';t.note='訂單預約歸還 18:30；建議提前辦理，確認所有行李已取出。';}if(t.title==='加油')t.note='還車前加油；油種、指定加油要求與收據需求依門市說明確認。';});
