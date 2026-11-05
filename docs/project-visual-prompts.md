# 프로젝트 설명 이미지 생성 기록

- 제작일: 2026-11-05
- 생성 도구: 내장 `image_gen`
- 저장 위치: `public/screenshot/`
- 새 이미지: 11장, 각 1672 x 941 PNG
- 기존 이미지 10장은 원본 그대로 재사용했습니다.

## quiz-cafe-session-flow-visual.png

파일: `public/screenshot/quiz-cafe-session-flow-visual.png`

```text
Use case: infographic-diagram. Asset type: technical explanation image for a Korean software engineer portfolio. Create one polished wide 16:9 infographic. Cream/off-white solid background, deep navy outlines and large headings, muted teal highlights, red only for errors. Dimensional editorial illustration with subtle realistic shadows, clear cards/objects and directional arrows. Match a cohesive professional portfolio infographic series. Short, large, highly legible Korean labels with standard English technical names. Keep text sparse and correct, ample padding at edges. No code snippets, no tiny text, no watermark, no invented metrics or functions. Each label must be correctly spelled. Primary request: explain Quiz Cafe authentication storage responsibilities. Left small Before panel titled '변경 전': two app screen cards independently accessing a box labeled 'SharedPreferences'. Main After panel titled '인증 정보 흐름': 'DataStore' storage box -> 'Flow 구독' -> 'AuthManager' with small subtitle '메모리 캐시' -> 'Interceptor' -> secured API gate labeled '인증 헤더'. Distinguish storage, state management and network as three aligned groups. Bottom separate logout path: '로그아웃' -> '토큰과 이메일 삭제' -> '로그아웃 이벤트' -> '화면 반영'. Use lock/key/card/store metaphors in navy and teal. Do not show encryption or refresh/reissue tokens; DataStore stores credentials and does not itself encrypt or reissue.
```

## quiz-cafe-mvi-flow-visual.png

파일: `public/screenshot/quiz-cafe-mvi-flow-visual.png`

```text
Use case: infographic-diagram. Asset type: technical explanation image for a Korean software engineer portfolio. Create one polished wide 16:9 infographic. Cream/off-white solid background, deep navy outlines and large headings, muted teal highlights, red only for errors. Dimensional editorial illustration with subtle realistic shadows, clear cards/objects and directional arrows. Match a cohesive professional portfolio infographic series. Short, large, highly legible Korean labels with standard English technical names. Keep text sparse and correct, ample padding at edges. No code snippets, no tiny text, no watermark, no invented metrics or functions. Each label must be correctly spelled. Primary request: explain a custom MVI architecture in Quiz Cafe, NOT Orbit. Main clean circular state flow: phone panel 'Compose Screen' -> card 'Intent' with two tiny labels '입력' and '클릭' -> larger processing card 'ViewModel' with subtitle '처리와 Reduce' -> card 'UiState' with three labels '입력값 / 로딩 / 오류' -> arrow back to Compose Screen. Separate smaller bottom branch out of ViewModel: 'SideEffect' -> 'Route' -> '화면 이동과 메시지'. Visually separate the persistent state loop and one-time event branch, use teal loop arrows and navy event arrows. Heading '직접 설계한 MVI'. No Orbit branding, code, test counts, productivity or performance numbers. SideEffect is not stored in UiState.
```

수정 프롬프트:

```text
Change only the lower event-branch connector in this infographic. The navy vertical arrow currently runs from ViewModel directly down into Route. Reroute it so the arrow exits the bottom of ViewModel, bends left, and points down into the TOP of the SideEffect box. Keep SideEffect -> Route -> 화면 이동과 메시지 as the single left-to-right event flow. There must be NO direct arrow from ViewModel to Route. Everything else including the cream/navy/teal style, all labels, title, state loop, icon positions, and image dimensions must remain identical. This fixes the custom MVI architecture: ViewModel emits SideEffect; Route consumes it.
```

## didimdol-room-search-visual.png

파일: `public/screenshot/didimdol-room-search-visual.png`

```text
Use case: infographic-diagram. Asset type: technical explanation image for a Korean software engineer portfolio. Create one polished wide 16:9 infographic. Cream/off-white solid background, deep navy outlines and large headings, muted teal highlights, red only for errors. Dimensional editorial illustration with subtle realistic shadows, clear cards/objects and directional arrows. Match a cohesive professional portfolio infographic series. Short, large, highly legible Korean labels with standard English technical names. Keep text sparse and correct, ample padding at edges. No code snippets, no tiny text, no watermark, no invented metrics or functions. Each label must be correctly spelled. Primary request: explain Didimdol local company lookup caching without implying offline route calculation. Top small setup strip: '앱 시작' -> '서버 업체 목록' -> database cylinder 'Room'. Main left Before titled '변경 전': '검색어' -> network server '서버 조회' with waiting clock. Main right After titled '목록 검색 개선': '검색어' -> 'Room 목록 검색' -> '일치 업체' -> distinct external map gate 'Direction5' with subtitle '거리와 시간 조회' -> '정렬과 표시'. At Room search step only place a clearly bounded badge '목록 검색 3~5초 → 0.5초 이하'. The Direction5 external API must be clearly outside this timing badge. Show a local device around Room search and cloud around Direction5. Do not imply entire search and distance operation is under 0.5 sec or offline; matched companies still use external API. No invented improvement percentage.
```

## didimdol-data-layer-visual.png

파일: `public/screenshot/didimdol-data-layer-visual.png`

```text
Use case: infographic-diagram. Asset type: technical explanation image for a Korean software engineer portfolio. Create one polished wide 16:9 infographic. Cream/off-white solid background, deep navy outlines and large headings, muted teal highlights, red only for errors. Dimensional editorial illustration with subtle realistic shadows, clear cards/objects and directional arrows. Match a cohesive professional portfolio infographic series. Short, large, highly legible Korean labels with standard English technical names. Keep text sparse and correct, ample padding at edges. No code snippets, no tiny text, no watermark, no invented metrics or functions. Each label must be correctly spelled. Primary request: explain Didimdol data-layer separation. Four small screen cards across top labeled '검색', '지도', '예약', '인증' flow into 'ViewModel' then 'Repository'. Repository fans out into three data responsibility boxes 'Room', 'Remote DataSource', 'AuthLocalDataSource'. Under AuthLocalDataSource alone place a small lock and label 'EncryptedSharedPreferences'. A distinct return path from Repository marked 'Result' -> 'StateFlow' with subtitle '로딩 / 결과 / 안내' -> screens. Small side injector object labeled 'Hilt' gives shared objects with dotted connector lines. Heading '데이터 책임 분리'. Clear three-layer composition with main direction top-to-bottom. Do not invent UseCase or domain modules. Do not suggest all databases are encrypted.
```

## pocs-ci-cd-visual.png

파일: `public/screenshot/pocs-ci-cd-visual.png`

```text
Use case: infographic-diagram. Asset type: technical explanation image for a Korean software engineer portfolio. Create one polished wide 16:9 infographic. Cream/off-white solid background, deep navy outlines and large headings, muted teal highlights, red only for errors. Dimensional editorial illustration with subtle realistic shadows, clear cards/objects and directional arrows. Match a cohesive professional portfolio infographic series. Short, large, highly legible Korean labels with standard English technical names. Keep text sparse and correct, ample padding at edges. No code snippets, no tiny text, no watermark, no invented metrics or functions. Each label must be correctly spelled. Primary request: show two separate GitHub Actions workflows for POCS, without implying automatic production release or a dependency between workflows. Two horizontal lanes, each triggered independently. Top lane heading '검증': trigger card 'main push / PR' -> two parallel cards 'Gradle build + ktlint' and 'UI 테스트' with three emulator devices labeled 'API 23', 'API 30', 'API 31'. Lower lane heading '배포': trigger card 'release/** push' -> package card 'Release AAB' -> lock card '서명' -> Play Store styled destination box labeled '내부 테스트 트랙'. Between or below lanes, a small vault 'GitHub Secrets' with dotted connectors for server URL, signing key and service account (use only short Korean labels '서버 URL', '서명키', '서비스 계정'). NO arrow connecting verification lane to release lane. Do not label destination production or 정식 출시. Heading 'CI와 내부 테스트 배포'. No invented time or error metrics.
```

## dear-my-diary-inference-visual.png

파일: `public/screenshot/dear-my-diary-inference-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: show the on-device GPT-2 text generation loop integrated into Android, not model training.
Composition: left input text card flows into a tokenizer device, then a large central inference machine with an FP16 model cartridge, then a Top-K selection wheel, then decoded tokens accumulate in a diary phone on the right. A clear curved feedback arrow from selected token returns to the next inference input, while a separate output arrow goes to the growing text on the phone. Small vocabulary and merges file cards feed tokenizer initialization. A small strip under the phone indicates StateFlow delivery.
Text (verbatim), only these labels: "기기 내 문장 생성", "텍스트 입력", "BPE 토큰화", "FP16 GPT-2", "TFLite 추론", "Top-K 선택", "다음 토큰", "다음 입력에 추가", "문장 복원", "StateFlow", "생성 중인 일기", "vocabulary", "merges".
Constraints: text input → BPE tokens → TFLite inference → Top-K selects next token; selected token feeds next iteration and is decoded to StateFlow and displayed. Model is pretrained and loaded locally. Do not show cloud generation, training, speed claims, or quality claims.
```

## dear-my-diary-prompt-composition-visual.png

파일: `public/screenshot/dear-my-diary-prompt-composition-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: explain how photo classification keywords, user preference information and voice/direct memo text become one text prompt for GPT-2.
Composition: left has three generous input lanes: a cropped photo passes through an image classifier and becomes one keyword card; user preference cards yield one selected profile-information card; a microphone and a pencil feed one memo text card through SpeechRecognizer for voice. These three text cards converge into an ordered central prompt stack. The stack shows short horizontal bands in this order: instruction, photo keyword, selected user information, memo at the very bottom. Right side GPT-2 machine yields an illustrated diary.
Text (verbatim), only these labels: "서로 다른 입력을 하나의 프롬프트로", "사진", "이미지 분류", "사진 키워드", "사용자 취향", "선택한 정보", "음성 메모", "SpeechRecognizer", "직접 입력", "메모", "프롬프트 조합", "작성 지시", "메모는 마지막에", "GPT-2", "일기".
Constraints: picture is classified to text keywords before entering GPT-2, never depict raw image directly entering GPT-2. No benchmark, no accuracy guarantee, no claim every preference is included. Keep memo-last ordering visible.
```

## dear-my-diary-emotion-mapping-visual.png

파일: `public/screenshot/dear-my-diary-emotion-mapping-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: illustrate the deterministic post-processing path from voice-based GPT-2 emotion text to a saved emoji on the home screen.
Composition: left microphone → text card → GPT-2 emotion-output card → central magnifying-glass sorter labelled find emotion word. From sorter branch upwards for a found emotion, downwards for no candidate and a clear default Happy card. Both branches converge at a single loading-complete check, then an emoji ID card → per-user Room storage drawer → right phone with a cute simple emotion character. A small arrow from storage to phone conveys restoration.
Text (verbatim), only these labels: "생성 텍스트를 감정 이모지로", "음성", "텍스트", "GPT-2", "감정 단어 찾기", "후보 있음", "후보 없음", "기본값 Happy", "로딩 종료", "이모지 ID", "사용자별 저장", "Room", "홈에서 복원".
Constraints: branch default Happy is required, both paths finish loading. This is output-word matching and emoji mapping, not a medical emotion diagnosis or an accuracy claim. Do not add extra emotions with invented names or infer diary sentiment automatically.
```

## bong-layered-architecture-visual.png

파일: `public/screenshot/bong-layered-architecture-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: show the three-module Clean Architecture structure of an Android app with clear module dependency direction.
Composition: three spacious dimensional workbenches across the page: presentation on left with phone/UI and ViewModel/UiState cards; domain in center with a tidy UseCase stack and repository-interface contract; data on right with repository implementation, DataSource, Mapper, and API/database shapes. A navy arrow from presentation points toward domain. A teal arrow from data points toward domain, so arrows meet in center. Label arrows module dependency. Bottom small caption badges show screen-state changes belong at presentation and DTO/data-source changes belong at data. Domain has a small "33개 UseCase" stack label to convey scope, not improvement.
Text (verbatim), only these labels: "계층별 책임과 모듈 의존", "presentation", "UI", "ViewModel", "UiState", "domain", "33개 UseCase", "Repository 인터페이스", "data", "Repository 구현체", "DataSource", "Mapper", "API", "모듈 의존", "화면 상태 변경", "DTO와 데이터 소스 변경".
Constraints: module compile dependency arrows MUST be presentation → domain ← data. Do not show domain depending on data, do not add runtime-flow arrows that confuse this. No performance or productivity improvement numbers. Keep technical labels clear and readable, minimal icons.
```

## bong-websocket-chat-visual.png

파일: `public/screenshot/bong-websocket-chat-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: explain a 1:1 Android chat with one persistent bidirectional WebSocket connection, separated communication and UI roles.
Composition: left large phone shows my and other message bubbles with clearly distinct alignments. Center-left ViewModel/StateFlow message-list controller, center repository contract/implementation desk, center-right WebSocketDataSource / OkHttp communication device, right chat server. Use unmistakable paired direction arrows for sending and receiving between the phone path and server. A small received-data inset beside ViewModel shows existing conversation array and a new single-message card converging into message-list state. Bottom near phone shows senderId selection to my/other bubbles, and ListAdapter / DiffUtil for changed rows.
Text (verbatim), only these labels: "연결 하나로 메시지 송수신", "채팅 화면", "ViewModel", "StateFlow", "ChattingRepository", "WebSocketDataSource", "OkHttp", "채팅 서버", "기존 대화", "새 메시지", "메시지 목록", "senderId", "내 메시지", "상대 메시지", "ListAdapter", "DiffUtil".
Constraints: show both existing array and single-message handling adjacent to ViewModel because receive JSON parsing exists there. Do not claim automatic reconnect, offline delivery, read receipts, encryption, delivery guarantees, or zero latency. Use one connection with two-way communication, not separate polling requests.
```

## pocs-paging-flow-visual.png

파일: `public/screenshot/pocs-paging-flow-visual.png`

```text
Use case: infographic-diagram.
Asset type: one explanatory illustration for a Korean software engineer portfolio. Generate a NEW standalone landscape 16:9 image, target 1672 x 941 proportion.
Visual style: premium editorial dimensional technical infographic, warm ivory/cream background, dark navy outlines and bold lettering, muted teal mechanisms and arrows, restrained rusty red only for problems. Tangible little machines, cards, soft shadows and subtle texture, clean spacing like an illustrated Korean engineering presentation. No code, no code syntax, no decorative placeholder text, no logo, no watermark, no central-dot punctuation. Large short accurate Korean labels, technical names in English as specified. Keep all text legible. One coherent composition with a small number of large objects, avoid tiny text or a wall of boxes. The topic-specific content below is the entire fact set: do not invent metrics or extra capabilities.
Primary request: show the shift from fetching a whole JSON post list at once to real server-side page requests with Paging3.
Composition: left a narrow problem vignette: enormous stack of all posts pushing into a crowded phone, label whole-data load. Right larger success flow: user scrolling phone → Pager mechanism → PostPagingSource dispatch device → API returns one small page tray → model conversion → PagingData stream → phone list. A simple next-page loop from scroll to next request. Show small separate terminal branches for empty page "종료" and failed request "오류 반환". Use page trays with tiny nontext bars to represent posts, not code.
Text (verbatim), only these labels: "필요한 페이지를 나눠 받기", "전체 데이터 로딩", "스크롤", "Paging3", "Pager", "PostPagingSource", "API 페이지 요청", "Post 변환", "PagingData", "다음 페이지", "빈 페이지", "종료", "요청 실패", "오류 반환".
Constraints: network actually requests pages, not just visually rendering subsets of a fully fetched list. Do not add FPS, time or memory percentage metrics. No claim network requests are removed, no production benchmarking. Main flow clear and legible, side branches secondary.
```



## 추가 검수 수정 기록

### dear-my-diary-inference-visual.png

```text
Edit only the lower-right output wiring of this exact infographic. Preserve all text, title, machine illustrations, colors, layout, feedback arrow, and all other connections unchanged. Correct the StateFlow data direction: remove the current downward arrow FROM the phone into StateFlow. The path must be "문장 복원" → "StateFlow" → the phone displaying "생성 중인 일기". Retain the direct horizontal output arrow to phone if desired, but do not show phone sending generated text into StateFlow. The simplest correction: the curved arrow from the 문장 복원 card still points to StateFlow, and a separate upward arrow from StateFlow points into the bottom of the phone. No new labels, no other changes.
```

### dear-my-diary-prompt-composition-visual.png

```text
Edit only the bottom-left memo input routing of this exact infographic. Preserve all other text, title, imagery, colors, prompt stack, ordering, and main arrows unchanged. Correct input routing: "음성 메모" microphone goes through "SpeechRecognizer", then to the "메모" text card. "직접 입력" pencil is already text and MUST bypass SpeechRecognizer and connect directly to the "메모" text card through a separate clear curved arrow. Remove the plus symbol joining voice and direct input before SpeechRecognizer, and remove the arrow from direct-input pencil into SpeechRecognizer. Move the direct input pencil slightly lower if necessary to draw a clear separate route under SpeechRecognizer to the 메모 card, with a visible arrowhead at memo. Do not suggest direct input needs speech recognition. No new labels, no other changes.
```
