let newsData = []
let newsDataKey = []

/**
 * 문자열을 숫자로 변환한 뒤 비교하는 함수
 * @param a 첫 번째 문자열
 * @param b 두 번째 문자열
 * @return a가 크면 -1, 같으면 0, b가 크면 1
 */
function convertStringToIntAndCompare(a, b) {
    let x = parseInt(a)
    let y = parseInt(b)
    if (x > y) return -1
    if (x === y) return 0
    if (x < y) return 1
}

/**
 * newsJson 파일을 불러오고 news를 생성하는 함수
 * createNewsComponents 호출
 * @param containerId news를 저장할 container(Tag)의 ID
 */
function loadNewsJson(containerId) {
    readJson("../Data/news.json", (json) => {
        newsData = json['data']
        newsDataKey = Object
            .keys(newsData)
            .sort(convertStringToIntAndCompare)
        createNewsComponents(containerId)
    })
}

/**
 * news를 생성하는 함수
 * @param containerId news를 저장할 container(Tag)의 ID
 */
function createNewsComponents(containerId) {
    let content = ''

    newsDataKey.forEach((year) => {
        let listContents = ''
        Object
            .keys(newsData[year])
            .sort(convertStringToIntAndCompare)
            .forEach((month) => {
                let newsList = newsData[year][month]
                listContents += listWithDate(`${year}. ${month}`, newsList, false)
            })
        content += customTitleWithContent(year, listContents, "font-size: 1.5rem; text-align: left", false)
    })
    let components = customTitleWithContent("NEWS", content, "font-size: 2rem", false)
    let container = document.getElementById(containerId)
    container.innerHTML = components
}

/**
 * notice를 생성하는 함수
 * @param containerId notice를 저장할 container(Tag)의 ID
 */
function createNotice(containerId) {
    let content = `
<div>
    <p class="lowMarginBottom" style="text-align: center">Contact <a href="mailto:ijang@hufs.ac.kr"
                                          style="font-weight: bold">ijang@hufs.ac.kr</a>
for inquiries about graduate program and undergraduate internship<br/>
(대학원 지망생 및 학부인턴연구원에 관심 있는 학생은 <a href="mailto:ijang@hufs.ac.kr"
                                           style="font-weight: bold">ijang@hufs.ac.kr</a>로문의주세요.)</p>
    <p class="lowMarginBottom" style="text-align: center">Masters and PhD students receive full tuition support and living expenses<br/>
                               (석사과정, 박사과정, 석박통합과정 연구원은 등록금 전액과 소정의 생활비를 지원받습니다.)</p>
    <a href="./recruit.html" style="border-bottom: none">
        <button style="margin-top: 2rem">Apply</button>
    </a>
</div>
    `
    let components = customTitleWithContent("NOTICE", content, "font-size: 2rem", false)
    let container = document.getElementById(containerId)
    container.innerHTML = components
}
