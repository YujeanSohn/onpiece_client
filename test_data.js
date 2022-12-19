const postsInitialState = {
  posts: [
    {
      postId: 1,
      userId: 1,
      nickname: "재민",
      title: "JAVA 활용하기",
      content: "",
      category: ["java"],
      level: "초급",
      headCount: 5,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [1, 2, 3],
    },
    {
      postId: 2,
      userId: 2,
      nickname: "손요",
      title: "Vue 활용하기",
      content: "",
      category: ["vue"],
      level: "초급",
      headCount: 8,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [1, 2, 3, 4, 5],
    },
    {
      postId: 3,
      userId: 3,
      nickname: "두부",
      title: "JAVASCRIPT 기초",
      content: "",
      category: ["javascript"],
      level: "초급",
      headCount: 5,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [1, 2, 3, 4, 5],
    },
    {
      id: 4,
      userId: 4,
      nickname: "혁찬",
      title: "node.js 프로젝트 구성하기",
      content: "",
      category: ["javascript"],
      level: "초급",
      headCount: 6,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [],
    },
    {
      id: 5,
      userId: 5,
      nickname: "재민",
      title: "JAVA 활용하기",
      content: "",
      category: ["java"],
      level: "초급",
      headCount: 5,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [1, 2, 3],
    },
    {
      id: 6,
      userId: 6,
      nickname: "재민",
      title: "JAVA 활용하기",
      content: "",
      category: ["java"],
      level: "초급",
      headCount: 5,
      recruitmentEndDay: 1671425197822,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [1, 2, 3],
    },
  ],
  post: {
    userId: 1,
    nickname: "손요",
    userDescription: "항해 10기 주특기 react로 수료 중. 2년 풀스택 개발 경력",
    userPosts: ["GO 맛보기", "React vs Vue"],
    title: "React Typescript 프로젝트 구성하기",
    content: "참고 강의\n스터디 진행 방식\n스터디 규칙",
    category: ["react", "javascript", "typescript"],
    level: "중급",
    headCount: 10,
    recruitmentEndDay: 1671425197822,
    startTime: "13:00:00",
    endTime: "14:00:00",
    startDay: "2021-02-21",
    endDay: "2021-02-21",
    applicants: [
      {
        userId: 1,
        nickname: "재민",
        email: "jaemin@naver.com",
        description: "열심히 하겠습니다.",
      },
      {
        userId: 2,
        nickname: "연수",
        email: "yeonsu@naver.com",
        description: "열심히 하겠습니다.",
      },
      {
        userId: 3,
        nickname: "혁찬",
        email: "hyukchan@naver.com",
        description: "열심히 하겠습니다.",
      },
    ],
  },
  isLoading: false,
};

const commentsInitialState = {
  comments: [
    {
      id: 1,
      comment: "댓글입니다.",
      updatedAt: 1671425197822,
    },
    {
      id: 2,
      comment: "댓글입니다.",
      updatedAt: 1671425197822,
    },
  ],
  isLoading: false,
};
