// docker is not reading some of the .env variables , so for now it is hard coded
const prodPathaoConfig = {
  clientId: "J0dN0J8aLO",
  clientSecret: "Q3FVeJFxv4Ny7pr0UuIAxktMAZ4R8P5cOzfnrUR6",
  // storeId: 357240 // this is the store Id for lazimpath,
  storeId: 356775, // this is the store id for balagu warehouse,
  pathaoUrl: "https://api-hermes.pathao.com",
  pathaoAccessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDEzNzIiLCJhdWQiOlsiMTQ5MjQiXSwiZXhwIjoxNzkwNjc2ODc2LCJuYmYiOjE3ODI5MDA4NzYsImlhdCI6MTc4MjkwMDg3NiwianRpIjoiZmRlMzEzYmJjOGMxNjE4NzI1ZGVjZmI5ZWUwMjlkM2FmZWU2ZGY4NzY2MTJjYjRhOTQ5ZDdlN2UzMjMyZGE5MSIsIm1lcmNoYW50X2lkIjoiblhlMFlPcXlheCIsInNjb3BlcyI6W119.LxNa6sv_QzrrWSO8JFIwMaISAIVG2C-nObjpMywAATJaJmrxqrCuvf8Fpk2uxTPifPm4Yut2GSR2frFoZRu0xfeGGXIq7hna7ydbbOQnjNijtFHHf6E9eYDMqJjajB0eWS5TKNqsBpAz4vpkRmHwm9KCoKz7ZdIbXFqFyg3Cr6qadJo4aZNWgC58GNOUpI5LGiUKJRZucyxTzC3vFjfk_XMEBX14fclRq0j_TX5Ctcwyi1totrx4wJNAPMavyVF9wZyL1O3gFpTUsDWrRtPzIkDZOIZK3aJDOQaO4QNRS3X9JdV5WRA1_fDYkYikRL0e6OpqSRtFSeNoonuCivtbLBoQBzN3BpVwfM9JGt4JQT91Bs2UVfA66kjb9JFoFZALSAjviNfhWqlSaSvbfuMPz6dhW582Ol4GpCN6Ed7CBY3RxJeYbwIOYXjfXIo--y55vYzZ5hGKrPCnoGd5I2XrlIxm1wIHqBCue5Q5YHDTjVMCJ7ZUgczVk1T2-bxOMP3Xw_wBqHtY1vWj0KD13zj6Fc3XP4Ny4M3njBpMB8-H6VoTCdcp5ABaxoFSMruJDGOrg0TaiEHcsrQODX5QCyr4wO5cZ3fUxZ2PCn996zUoX7Wn85iuDBN4oT9Q-hfWj2--kRDoLyFKKANZGv-k5dSdmEK6O-TcH_AvbVg_Vck4WcM",
  pathaoRefreshToken:
    "def502004f84caeba7493e6be06407b80eb32fcd42abb6343e7f6c63ce86fff88475f159dd41be0c027cdb15060cb0b89f7cfb44db99ca077b958ace5f70a6e145b53c3a3a1d8d400824b3e1d2c7671950b1046861e2a138bcc55f5f85061cfda2465726f4dd34ef277fe1ce88697c9c2384e7e61d13c7fbff72274e72d39a82ef22cf105efaa6da0bfe90a10312aa0ea39db6049f1aa28387a8e1ce9ddc994c125f69606e640e1fab76bce59b6fcfe6cc6d30ad636751dcceb9905689a4a481c8f8c7ebb83417c3c278671975bc31e1318fc7c5e49b12bf07b5c00eef1a6c1cefaa76b0b8eeea4909abcb6b96030a0b97eae0deda299015fc18b093ca4a52e5a2b6bcde998cbf547cd0f48ca07f58c201ac26d4933f143c468f7b75a5e0f454f67785dfdf251823e7e94e521039f785370109b0120f32296bda3836af00ebcc7da52def913384dead5044396af6b8b9c7fefe9dccf270f00b853874",
};

const stagePathaoConfig = {
  clientId: "QK9b69QaEv",
  clientSecret: "k12nLGgq0zM3a65Sp65el4SZO6dhhMIxR0rDCavz",
  storeId: 130903,
  pathaoUrl: "https://courier-api-sandbox.pathao.com",
  pathaoAccessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTMyNjkiLCJhdWQiOlsiMzM5Il0sImV4cCI6MTc4MjkwNTg1MywibmJmIjoxNzc1MTI5ODUzLCJpYXQiOjE3NzUxMjk4NTMsImp0aSI6ImY0M2M4ODc0ZDBjZjQyYzE0ODljN2U1NDY3MzY4NzAzMjcyMzY2YWZiMmY4MWFmMjYzYzhjN2IwM2Q2OTFjNGEiLCJtZXJjaGFudF9pZCI6IkxEZHdRREphMVkiLCJzY29wZXMiOltdfQ.mUonxHuRLhQG0AMz3_81tQMjSuFpyU-kciXqbDy_wU8tMHzovgW4Gm6P7kCMQZTm7Q_4i37hZkvo7sYqyaRNci225fs4yxFLYOgpx7OgEtmUFJniOKxfuv_lUUSP9AtNxc6AkXPgCfkP7WBDbU_eZcO3ACCZVjS939_55xBY-TiN6HOoTBI36oUKJAxJs3UIZPJdEc0fjmHqk2-1krrlt-CneHHHnmQJaSx-6sY9G4P5x1Eedx23pWXbrE-6QCzscVLwSxwp603UeQiIWkIWC-OJ34imNe4E0jCIoH81IjmGm8d_f9z0CYJRvB4rgQUoox_BwqzHRBlHOdscWGwzdFXZqsgNz88fsxjZXhkr6A900Wo_h9l1cJ20_yETroIa7TkBM9EcyvE0daV-HWPUpZn4EG64H_XDtvoXRgIBgDgHup0d3OunFK-iu1NHbxU4QzXQz6DJdL882gEsCc1RBadYgzSGezNv_NFCP5BOKCOhRdktyMdhjk4lNgsTyvoxnhhnXSY5Z5c6mTecT58LsGTbSGZRX14co3ZpcLKnEDEUVC4WPmsPlfMHqvb53VNj8j84yHiQUZjMSqdjggTUZIbd5aJRd2IPswIq17o_u2QJpTD5EaHK0y1pLtBmuEuR0ym7eCHHh3lBRwHjdSrFACc8K8Hb0yeig8WnA1u8kYs",
  pathaoRefreshToken:
    "def5020086659ecaa43559991ae952aafc28f5d25d99fc06c9a7942e45566efe50a487a2dbf77731fb6f78b1cea35b9c98c37b310051d92ca8f4d7513cbe84e4c481d3b4e25d6bbb95935a205ef2bac09fb1a7592b25180272253458487606bdbe4914e1c96304866294bcd0cfd886c75111fc632f079d00bdea2c65e927b30c775cf3c681167bb04c922c93522b8a82a880db05b8ea809556f6c34af6f7f08f352ff391483b7017c2b59b793add2b5cb37581081168eba4a7048ddfe74240f5b79b4409262701fef61b7bda75b239a77aee536b8fcdf3c7243dd33880648d2658134e89c55406a9afebc7e44ced5125dc9c609ad5f120f4c28ee215aa45a4ac5e35eab65b0fe543e0d421e473fbc783761d9c370cd6b0712990071ed6b24e828eee3f1f179c6ede31d1345b5142723e80b601396f2741bedd37a0958fc6253028c8620611e5314c60252375ba72428b317bfbe8b7401b3ee16cd3eb",
};

export const pathaoConfig = {
  pathaoClientId:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.clientId
      : stagePathaoConfig.clientId,
  pathaoClientSecret:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.clientSecret
      : stagePathaoConfig.clientSecret,
  pathaoStoreId:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.storeId
      : stagePathaoConfig.storeId,
  pathaoUrl:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.pathaoUrl
      : stagePathaoConfig.pathaoUrl,
  pathaoAccessToken:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.pathaoAccessToken
      : stagePathaoConfig.pathaoAccessToken,
  pathaoRefreshToken:
    process.env.NODE_ENV === "production"
      ? prodPathaoConfig.pathaoRefreshToken
      : stagePathaoConfig.pathaoRefreshToken,
  expiresAt: new Date("2026-08-30").getTime(), // update the pathoo access and refresh token every 3 months , use postman to get the new token and update the prodPathooConfig
  // expiresAt: new Date("2025-03-01").getTime(),
};
