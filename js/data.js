/**
 * SiMia World — Show & Episode Data
 * All content data for the TV interface.
 */

const GCS_BUCKET = 'https://storage.googleapis.com/simia-tv-media';


const SHOWS = [
  {
    id: 'wonder-words',
    title: 'Wonder Words',
    folder: 'Wonder Words',
    thumbnail: 'assets/shows/thumbs/ShowThumb_WonderWords.png',
    builderLogo: 'assets/shows/logos/ShowLogo_WonderWords.png',
    color: '#7d00dd',
    episodes: [
      { id: 'ww-e1',  num: 1,  title: 'Acceptance',    file: 'WonderWords_E1_Acceptance',    thumbnail: 'assets/thumbnails/WonderWords_E1_Acceptance.jpg',    duration: '3:19', previewStart: 51 },
      { id: 'ww-e2',  num: 2,  title: 'Adaptability',  file: 'WonderWords_E2_Adaptibility',  thumbnail: 'assets/thumbnails/WonderWords_E2_Adaptibility.jpg',  duration: '2:51', previewStart: 44 },
      { id: 'ww-e3',  num: 3,  title: 'Appreciation',  file: 'WonderWords_E3_Appreciation',  thumbnail: 'assets/thumbnails/WonderWords_E3_Appreciation.jpg',  duration: '4:20', previewStart: 66 },
      { id: 'ww-e4',  num: 4,  title: 'Balance',       file: 'WonderWords_E4_Balance',       thumbnail: 'assets/thumbnails/WonderWords_E4_Balance.jpg',       duration: '3:12', previewStart: 49 },
      { id: 'ww-e5',  num: 5,  title: 'Belonging',     file: 'WonderWords_E5_Belonging',     thumbnail: 'assets/thumbnails/WonderWords_E5_Belonging.jpg',     duration: '3:25', previewStart: 52 },
      { id: 'ww-e6',  num: 6,  title: 'Bravery',       file: 'WonderWords_E6_Bravery',       thumbnail: 'assets/thumbnails/WonderWords_E6_Bravery.jpg', duration: '3:05', previewStart: 47 },
      { id: 'ww-e7',  num: 7,  title: 'Calm',          file: 'WonderWords_E7_Calm',          thumbnail: 'assets/thumbnails/WonderWords_E7_Calm.jpg', duration: '2:48', previewStart: 43 },
      { id: 'ww-e8',  num: 8,  title: 'Caring',        file: 'WonderWords_E8_Caring',        thumbnail: 'assets/thumbnails/WonderWords_E8_Caring.jpg', duration: '3:15', previewStart: 50 },
      { id: 'ww-e9',  num: 9,  title: 'Confidence',    file: 'WonderWords_E9_Confidence',    thumbnail: 'assets/thumbnails/WonderWords_E9_Confidence.jpg', duration: '3:33', previewStart: 54 },
      { id: 'ww-e10', num: 10, title: 'Cooperation',   file: 'WonderWords_E10_Cooperation',  thumbnail: 'assets/thumbnails/WonderWords_E10_Cooperation.jpg', duration: '3:41', previewStart: 56 },
      { id: 'ww-e11', num: 11, title: 'Courage',       file: 'WonderWords_E11_Courage',      thumbnail: 'assets/thumbnails/WonderWords_E11_Courage.jpg', duration: '3:08', previewStart: 48 },
      { id: 'ww-e12', num: 12, title: 'Creativity',    file: 'WonderWords_E12_Creativity',   thumbnail: 'assets/thumbnails/WonderWords_E12_Creativity.jpg', duration: '3:22', previewStart: 52 },
      { id: 'ww-e13', num: 13, title: 'Curiosity',     file: 'WonderWords_E13_Curiosity',    thumbnail: 'assets/thumbnails/WonderWords_E13_Curiosity.jpg', duration: '2:55', previewStart: 45 },
      { id: 'ww-e14', num: 14, title: 'Discovery',     file: 'WonderWords_E14_Discovery',    thumbnail: 'assets/thumbnails/WonderWords_E14_Discovery.jpg', duration: '3:18', previewStart: 51 },
      { id: 'ww-e15', num: 15, title: 'Empathy',       file: 'WonderWords_E15_Empathy',      thumbnail: 'assets/thumbnails/WonderWords_E15_Empathy.jpg', duration: '3:45', previewStart: 57 },
      { id: 'ww-e16', num: 16, title: 'Fairness',      file: 'WonderWords_E16_Fairness',     thumbnail: 'assets/thumbnails/WonderWords_E16_Fairness.jpg', duration: '3:02', previewStart: 46 },
      { id: 'ww-e17', num: 17, title: 'Flexibility',   file: 'WonderWords_E17_Flexibility',  thumbnail: 'assets/thumbnails/WonderWords_E17_Flexibility.jpg', duration: '3:28', previewStart: 53 },
      { id: 'ww-e18', num: 18, title: 'Focus',         file: 'WonderWords_E18_Focus',        thumbnail: 'assets/thumbnails/WonderWords_E18_Focus.jpg', duration: '2:42', previewStart: 42 },
      { id: 'ww-e19', num: 19, title: 'Forgiveness',   file: 'WonderWords_E19_Forgiveness',  thumbnail: 'assets/thumbnails/WonderWords_E19_Forgiveness.jpg', duration: '3:37', previewStart: 55 },
      { id: 'ww-e20', num: 20, title: 'Friendship',    file: 'WonderWords_E20_Friendship',   thumbnail: 'assets/thumbnails/WonderWords_E20_Friendship.jpg', duration: '3:51', previewStart: 59 },
      { id: 'ww-e21', num: 21, title: 'Generosity',    file: 'WonderWords_E21_Generosity',   thumbnail: 'assets/thumbnails/WonderWords_E21_Generosity.jpg', duration: '3:14', previewStart: 50 },
      { id: 'ww-e22', num: 22, title: 'Gentleness',    file: 'WonderWords_E22_Gentleness',   thumbnail: 'assets/thumbnails/WonderWords_E22_Gentleness.jpg', duration: '2:58', previewStart: 46 },
      { id: 'ww-e23', num: 23, title: 'Gratitude',     file: 'WonderWords_E23_Gratitude',    thumbnail: 'assets/thumbnails/WonderWords_E23_Gratitude.jpg', duration: '3:26', previewStart: 53 },
      { id: 'ww-e24', num: 24, title: 'Growth',        file: 'WonderWords_E24_Growth',       thumbnail: 'assets/thumbnails/WonderWords_E24_Growth.jpg', duration: '3:09', previewStart: 48 },
      { id: 'ww-e25', num: 25, title: 'Respect',       file: 'WonderWords_E25_Respect',      thumbnail: 'assets/thumbnails/WonderWords_E25_Respect.jpg', duration: '3:44', previewStart: 57 },
    ]
  },
  {
    id: 'why-things-happen',
    title: 'Why Things Happen',
    folder: 'Why Things Happen',
    thumbnail: 'assets/shows/thumbs/ShowThumb_WhyThingsHappen.png',
    builderLogo: 'assets/shows/logos/ShowLogo_WhyThingsHappen.png',
    color: '#0071bc',
    episodes: [
      { id: 'wth-e1',  num: 1,  title: 'Balloon Floats Away',              file: 'WhyThingsHappen_E1_BalloonFloatsAway',            thumbnail: 'assets/thumbnails/WhyThingsHappen_E1_BalloonFloatsAway.jpg',    duration: '2:13', previewStart: 34 },
      { id: 'wth-e2',  num: 2,  title: 'Ice Melting on Table',             file: 'WhyThingsHappen_E2_IceMeltingOnTable',             thumbnail: 'assets/thumbnails/WhyThingsHappen_E2_IceMeltingOnTable.jpg',    duration: '2:35', previewStart: 40 },
      { id: 'wth-e3',  num: 3,  title: 'Puddle Disappears',               file: 'WhyThingsHappen_E3_PuddleDissapears',              thumbnail: 'assets/thumbnails/WhyThingsHappen_E3_PuddleDissapears.jpg',    duration: '3:03', previewStart: 47 },
      { id: 'wth-e4',  num: 4,  title: 'Shadows Getting Longer',          file: 'WhyThingsHappen_E4_ShadowsGettingLonger',          thumbnail: 'assets/thumbnails/WhyThingsHappen_E4_ShadowsGettingLonger.jpg', duration: '2:48', previewStart: 43 },
      { id: 'wth-e5',  num: 5,  title: 'Leaves Fall From Trees',          file: 'WhyThingsHappen_E5_LeavesFallFromTrees',           thumbnail: 'assets/thumbnails/WhyThingsHappen_E5_LeavesFallFromTrees.jpg',  duration: '2:57', previewStart: 47 },
      { id: 'wth-e6',  num: 6,  title: 'Rain Makes Puddles',              file: 'WhyThingsHappen_E6_RainMakesPuddles',              thumbnail: 'assets/thumbnails/WhyThingsHappen_E6_RainMakesPuddles.jpg', duration: '2:22', previewStart: 36 },
      { id: 'wth-e7',  num: 7,  title: 'Magnet Sticks to Metal',          file: 'WhyThingsHappen_E7_MagnetSticksToMetal',           thumbnail: 'assets/thumbnails/WhyThingsHappen_E7_MagnetSticksToMetal.jpg', duration: '2:45', previewStart: 42 },
      { id: 'wth-e8',  num: 8,  title: 'Swing Slows Down',                file: 'WhyThingsHappen_E8_SwingSlowsDown',                thumbnail: 'assets/thumbnails/WhyThingsHappen_E8_SwingSlowsDown.jpg', duration: '2:18', previewStart: 35 },
      { id: 'wth-e9',  num: 9,  title: 'Flashlight Makes Circles',        file: 'WhyThingsHappen_E9_FlashlightMakesCircles',        thumbnail: 'assets/thumbnails/WhyThingsHappen_E9_FlashlightMakesCircles.jpg', duration: '2:31', previewStart: 39 },
      { id: 'wth-e10', num: 10, title: 'Steam Rises From Hot Food',       file: 'WhyThingsHappen_E10_StreamRisesFromHotFood',       thumbnail: 'assets/thumbnails/WhyThingsHappen_E10_StreamRisesFromHotFood.jpg', duration: '2:55', previewStart: 45 },
      { id: 'wth-e11', num: 11, title: 'Clouds Moving Across the Sky',    file: 'WhyThingsHappen_E11_CloudsMovingAcrossTheSky',     thumbnail: 'assets/thumbnails/WhyThingsHappen_E11_CloudsMovingAcrossTheSky.jpg', duration: '3:08', previewStart: 48 },
      { id: 'wth-e12', num: 12, title: 'Static Makes Hair Stand Up',      file: 'WhyThingsHappen_E12_StaticMakesHairStandUp',       thumbnail: 'assets/thumbnails/WhyThingsHappen_E12_StaticMakesHairStandUp.jpg', duration: '2:42', previewStart: 42 },
      { id: 'wth-e13', num: 13, title: 'Balls Bounce Higher on Hard Ground', file: 'WhyThingsHappen_E13_BallsBounceHigherOnHardGround', thumbnail: 'assets/thumbnails/WhyThingsHappen_E13_BallsBounceHigherOnHardGround.jpg', duration: '2:28', previewStart: 38 },
      { id: 'wth-e14', num: 14, title: 'Bread Turns Brown in the Toaster', file: 'WhyThingsHappen_E14_BreadTurnsBrownInTheToaster', thumbnail: 'assets/thumbnails/WhyThingsHappen_E14_BreadTurnsBrownInTheToaster.jpg', duration: '2:51', previewStart: 44 },
      { id: 'wth-e15', num: 15, title: 'Kite Lifting Into the Air',       file: 'WhyThingsHappen_E15_KiteLiftingIntoTheAir',        thumbnail: 'assets/thumbnails/WhyThingsHappen_E15_KiteLiftingIntoTheAir.jpg', duration: '2:37', previewStart: 40 },
      { id: 'wth-e16', num: 16, title: 'Wind Pushes Leaves',              file: 'WhyThingsHappen_E16_WindPushesLeaves',             thumbnail: 'assets/thumbnails/WhyThingsHappen_E16_WindPushesLeaves.jpg', duration: '2:15', previewStart: 34 },
      { id: 'wth-e17', num: 17, title: 'Shadow Follows Someone',          file: 'WhyThingsHappen_E17_ShadowFollowsSomeone',         thumbnail: 'assets/thumbnails/WhyThingsHappen_E17_ShadowFollowsSomeone.jpg', duration: '2:44', previewStart: 42 },
      { id: 'wth-e18', num: 18, title: 'Condensation Forms on a Cold Cup', file: 'WhyThingsHappen_E18_CondensationFormsOnAColdCup', thumbnail: 'assets/thumbnails/WhyThingsHappen_E18_CondensationFormsOnAColdCup.jpg', duration: '3:01', previewStart: 46 },
      { id: 'wth-e19', num: 19, title: 'Toy Car Rolls Downhill',          file: 'WhyThingsHappen_E19_ToyCarRollsDownhill',          thumbnail: 'assets/thumbnails/WhyThingsHappen_E19_ToyCarRollsDownhill.jpg', duration: '2:33', previewStart: 39 },
      { id: 'wth-e20', num: 20, title: 'Candles Go Out',                  file: 'WhyThingsHappen_E20_CandlesGoOut',                 thumbnail: 'assets/thumbnails/WhyThingsHappen_E20_CandlesGoOut.jpg', duration: '2:19', previewStart: 36 },
      { id: 'wth-e21', num: 21, title: 'Fan Makes Paper Move',            file: 'WhyThingsHappen_E21_FanMakesPaperMove',            thumbnail: 'assets/thumbnails/WhyThingsHappen_E21_FanMakesPaperMove.jpg', duration: '2:27', previewStart: 38 },
      { id: 'wth-e22', num: 22, title: 'Rubber Band Snaps Back',          file: 'WhyThingsHappen_E22_RubberBandSnapsBack',          thumbnail: 'assets/thumbnails/WhyThingsHappen_E22_RubberBandSnapsBack.jpg', duration: '2:40', previewStart: 41 },
      { id: 'wth-e23', num: 23, title: 'Mirror Shows a Reflection',       file: 'WhyThingsHappen_E23_MirrorShowsAReflection',       thumbnail: 'assets/thumbnails/WhyThingsHappen_E23_MirrorShowsAReflection.jpg', duration: '2:52', previewStart: 44 },
      { id: 'wth-e24', num: 24, title: 'Snow Melts Indoors',              file: 'WhyThingsHappen_E24_SnowMeltsIndoors',             thumbnail: 'assets/thumbnails/WhyThingsHappen_E24_SnowMeltsIndoors.jpg', duration: '2:25', previewStart: 37 },
      { id: 'wth-e25', num: 25, title: 'Food Cools Down',                 file: 'WhyThingsHappen_E25_FoodCoolsDown',                thumbnail: 'assets/thumbnails/WhyThingsHappen_E25_FoodCoolsDown.jpg', duration: '2:38', previewStart: 40 },
    ]
  },
  {
    id: 'big-feelings',
    title: 'Big Feelings',
    folder: 'Big Feelings',
    thumbnail: 'assets/shows/thumbs/ShowThumb_BigFeelings.png',
    builderLogo: 'assets/shows/logos/ShowLogo_BigFeelings.png',
    color: '#a00a60',
    episodes: [
      { id: 'bf-e1',  num: 1,  title: 'Left Out',                         file: 'BigFeelings_E1_LeftOut',                         thumbnail: 'assets/thumbnails/BigFeelings_E1_LeftOut.jpg',         duration: '3:47', previewStart: 58 },
      { id: 'bf-e2',  num: 2,  title: 'Embarrassed',                      file: 'BigFeelings_E2_Embarrassed',                     thumbnail: 'assets/thumbnails/BigFeelings_E2_Embarrassed.jpg',     duration: '3:42', previewStart: 56 },
      { id: 'bf-e3',  num: 3,  title: 'Proud But Nervous',                file: 'BigFeelings_E3_ProudButNervous',                 thumbnail: 'assets/thumbnails/BigFeelings_E3_ProudButNervous.jpg', duration: '3:21', previewStart: 51 },
      { id: 'bf-e4',  num: 4,  title: 'Jealous',                          file: 'BigFeelings_E4_Jealous',                         thumbnail: 'assets/thumbnails/BigFeelings_E4_Jealous.jpg',         duration: '3:57', previewStart: 60 },
      { id: 'bf-e5',  num: 5,  title: 'Misunderstood',                    file: 'BigFeelings_E5_Misunderstood',                   thumbnail: 'assets/thumbnails/BigFeelings_E5_Misunderstood.jpg',   duration: '3:32', previewStart: 54 },
      { id: 'bf-e6',  num: 6,  title: 'Disappointed',                     file: 'BigFeelings_E6_Dissapointed',                    thumbnail: 'assets/thumbnails/BigFeelings_E6_Dissapointed.jpg', duration: '3:15', previewStart: 50 },
      { id: 'bf-e7',  num: 7,  title: 'Excited But Scared',               file: 'BigFeelings_E7_ExcitedButScared',                thumbnail: 'assets/thumbnails/BigFeelings_E7_ExcitedButScared.jpg', duration: '3:28', previewStart: 53 },
      { id: 'bf-e8',  num: 8,  title: 'Frustrated',                       file: 'BigFeelings_E8_Frustrated',                      thumbnail: 'assets/thumbnails/BigFeelings_E8_Frustrated.jpg', duration: '3:38', previewStart: 55 },
      { id: 'bf-e9',  num: 9,  title: 'Lonely',                           file: 'BigFeelings_E9_Lonely',                          thumbnail: 'assets/thumbnails/BigFeelings_E9_Lonely.jpg', duration: '3:22', previewStart: 52 },
      { id: 'bf-e10', num: 10, title: 'Overwhelmed',                      file: 'BigFeelings_E10_Overwhelmed',                    thumbnail: 'assets/thumbnails/BigFeelings_E10_Overwhelmed.jpg', duration: '3:55', previewStart: 60 },
      { id: 'bf-e11', num: 11, title: 'Unsure About Yourself',            file: 'BigFeelings_E11_UnsureAboutYourself',             thumbnail: 'assets/thumbnails/BigFeelings_E11_UnsureAboutYourself.jpg', duration: '3:18', previewStart: 51 },
      { id: 'bf-e12', num: 12, title: 'Nervous About Trying Something New', file: 'BigFeelings_E12_NervousAboutTryingSomethingNew', thumbnail: 'assets/thumbnails/BigFeelings_E12_NervousAboutTryingSomethingNew.jpg', duration: '3:44', previewStart: 57 },
      { id: 'bf-e13', num: 13, title: 'Angry and Not Knowing Why',        file: 'BigFeelings_E13_AngryAndNotKnowingWhy',           thumbnail: 'assets/thumbnails/BigFeelings_E13_AngryAndNotKnowingWhy.jpg', duration: '3:51', previewStart: 59 },
      { id: 'bf-e14', num: 14, title: 'Happy for Someone Else',           file: 'BigFeelings_E14_HappyForSomeoneElse',             thumbnail: 'assets/thumbnails/BigFeelings_E14_HappyForSomeoneElse.jpg', duration: '3:09', previewStart: 48 },
      { id: 'bf-e15', num: 15, title: 'Regretful',                        file: 'BigFeelings_E15_Regretful',                       thumbnail: 'assets/thumbnails/BigFeelings_E15_Regretful.jpg', duration: '3:35', previewStart: 54 },
      { id: 'bf-e16', num: 16, title: 'Pressured',                        file: 'BigFeelings_E16_Pressured',                       thumbnail: 'assets/thumbnails/BigFeelings_E16_Pressured.jpg', duration: '3:27', previewStart: 53 },
      { id: 'bf-e17', num: 17, title: 'Hopeful',                          file: 'BigFeelings_E17_Hopeful',                         thumbnail: 'assets/thumbnails/BigFeelings_E17_Hopeful.jpg', duration: '3:12', previewStart: 49 },
      { id: 'bf-e18', num: 18, title: 'Anxious',                          file: 'BigFeelings_E18_Anxious',                         thumbnail: 'assets/thumbnails/BigFeelings_E18_Anxious.jpg', duration: '3:48', previewStart: 58 },
      { id: 'bf-e19', num: 19, title: 'Confident',                        file: 'BigFeelings_E19_Confident',                       thumbnail: 'assets/thumbnails/BigFeelings_E19_Confident.jpg', duration: '3:05', previewStart: 47 },
      { id: 'bf-e20', num: 20, title: 'Confused',                         file: 'BigFeelings_E20_Confused',                        thumbnail: 'assets/thumbnails/BigFeelings_E20_Confused.jpg', duration: '3:33', previewStart: 54 },
      { id: 'bf-e21', num: 21, title: 'Thankful',                         file: 'BigFeelings_E21_Thankful',                        thumbnail: 'assets/thumbnails/BigFeelings_E21_Thankful.jpg', duration: '3:19', previewStart: 51 },
      { id: 'bf-e22', num: 22, title: 'Ashamed',                          file: 'BigFeelings_E22_Ashamed',                         thumbnail: 'assets/thumbnails/BigFeelings_E22_Ashamed.jpg', duration: '3:41', previewStart: 56 },
      { id: 'bf-e23', num: 23, title: 'Relieved',                         file: 'BigFeelings_E23_Relieved',                        thumbnail: 'assets/thumbnails/BigFeelings_E23_Relieved.jpg', duration: '3:08', previewStart: 48 },
      { id: 'bf-e24', num: 24, title: 'Worried',                          file: 'BigFeelings_E24_Worried',                         thumbnail: 'assets/thumbnails/BigFeelings_E24_Worried.jpg', duration: '3:52', previewStart: 59 },
      { id: 'bf-e25', num: 25, title: 'Determined',                       file: 'BigFeelings_E25_Determined',                      thumbnail: 'assets/thumbnails/BigFeelings_E25_Determined.jpg', duration: '3:25', previewStart: 52 },
    ]
  },
  {
    id: 'think-it-through',
    title: 'Think It Through',
    folder: 'Think It Through',
    thumbnail: 'assets/shows/thumbs/ShowThumb_ThinkItThrough.png',
    builderLogo: 'assets/shows/logos/ShowLogo_ThinkItThrough.png',
    color: '#492d7f',
    episodes: [
      { id: 'tit-e1',  num: 1,  title: 'Deciding Whether to Tell the Truth',        file: 'ThinkItThrough_E1_DecidingWhetherToTellTheTruth',        thumbnail: 'assets/thumbnails/ThinkItThrough_E1_DecidingWhetherToTellTheTruth.jpg',        duration: '3:29', previewStart: 53 },
      { id: 'tit-e2',  num: 2,  title: 'Choosing Who Goes First',                   file: 'ThinkItThrough_E2_ChoosingWhoGoesFirst',                 thumbnail: 'assets/thumbnails/ThinkItThrough_E2_ChoosingWhoGoesFirst.jpg',                 duration: '3:02', previewStart: 47 },
      { id: 'tit-e3',  num: 3,  title: 'Reacting Without Listening',                file: 'ThinkItThrough_E3_ReactingWithoutListening',             thumbnail: 'assets/thumbnails/ThinkItThrough_E3_ReactingWithoutListening.jpg',              duration: '4:32', previewStart: 69 },
      { id: 'tit-e4',  num: 4,  title: 'Deciding to Share or Keep Something',       file: 'ThinkItThrough_E4_DecidingToShareOrKeepSomething',       thumbnail: 'assets/thumbnails/ThinkItThrough_E4_DecidingToShareOrKeepSomething.jpg',       duration: '3:35', previewStart: 54 },
      { id: 'tit-e5',  num: 5,  title: "Interrupting Someone While They're Talking", file: 'ThinkItThrough_E5_InterruptingSomeoneWhileTheyreTalking', thumbnail: 'assets/thumbnails/ThinkItThrough_E5_InterruptingSomeoneWhileTheyreTalking.jpg', duration: '4:05', previewStart: 62 },
      { id: 'tit-e6',  num: 6,  title: 'Choosing Between Two Games',                file: 'ThinkItThrough_E6_ChoosingBetweenTwoGames',              thumbnail: 'assets/thumbnails/ThinkItThrough_E6_ChoosingBetweenTwoGames.jpg', duration: '3:18', previewStart: 51 },
      { id: 'tit-e7',  num: 7,  title: 'Joining In or Staying Out',                 file: 'ThinkItThrough_E7_JoiningInOrStayingOut',                thumbnail: 'assets/thumbnails/ThinkItThrough_E7_JoiningInOrStayingOut.jpg', duration: '3:42', previewStart: 56 },
      { id: 'tit-e8',  num: 8,  title: 'Deciding to Ask for Help',                  file: 'ThinkItThrough_E8_DecidingToAskForHelp',                 thumbnail: 'assets/thumbnails/ThinkItThrough_E8_DecidingToAskForHelp.jpg', duration: '3:11', previewStart: 49 },
      { id: 'tit-e9',  num: 9,  title: 'Forgetting to Follow a Rule',               file: 'ThinkItThrough_E9_ForgettingToFollowARule',              thumbnail: 'assets/thumbnails/ThinkItThrough_E9_ForgettingToFollowARule.jpg', duration: '3:55', previewStart: 60 },
      { id: 'tit-e10', num: 10, title: 'Changing Your Mind Too Late',               file: 'ThinkItThrough_E10_ChangingYourMindTooLate',             thumbnail: 'assets/thumbnails/ThinkItThrough_E10_ChangingYourMindTooLate.jpg', duration: '3:24', previewStart: 52 },
      { id: 'tit-e11', num: 11, title: 'Assuming Instead of Asking',                file: 'ThinkItThrough_E11_AssumingInsteadOfAsking',              thumbnail: 'assets/thumbnails/ThinkItThrough_E11_AssumingInsteadOfAsking.jpg', duration: '3:38', previewStart: 55 },
      { id: 'tit-e12', num: 12, title: 'Choosing to Wait or Rush',                  file: 'ThinkItThrough_E12_ChoosingToWaitOrRush',                thumbnail: 'assets/thumbnails/ThinkItThrough_E12_ChoosingToWaitOrRush.jpg', duration: '3:05', previewStart: 47 },
      { id: 'tit-e13', num: 13, title: 'Speaking Up or Staying Quiet',              file: 'ThinkItThrough_E13_SpeakingUpOrStayingQuiet',            thumbnail: 'assets/thumbnails/ThinkItThrough_E13_SpeakingUpOrStayingQuiet.jpg', duration: '3:47', previewStart: 58 },
      { id: 'tit-e14', num: 14, title: 'Handling Disagreements',                    file: 'ThinkItThrough_E14_HandlingDissagreements',               thumbnail: 'assets/thumbnails/ThinkItThrough_E14_HandlingDissagreements.jpg', duration: '4:02', previewStart: 62 },
      { id: 'tit-e15', num: 15, title: 'Deciding How to Apologize',                 file: 'ThinkItThrough_E15_DecidingHowToApologize',              thumbnail: 'assets/thumbnails/ThinkItThrough_E15_DecidingHowToApologize.jpg', duration: '3:33', previewStart: 54 },
      { id: 'tit-e16', num: 16, title: "Making a Promise You're Not Sure You Can Keep", file: 'ThinkItThrough_E16_MakingAPromiseYoureNotSureYouCanKeep', thumbnail: 'assets/thumbnails/ThinkItThrough_E16_MakingAPromiseYoureNotSureYouCanKeep.jpg', duration: '4:15', previewStart: 65 },
      { id: 'tit-e17', num: 17, title: 'Choosing Sides in an Argument',             file: 'ThinkItThrough_E17_ChoosingSidesInAnArgument',            thumbnail: 'assets/thumbnails/ThinkItThrough_E17_ChoosingSidesInAnArgument.jpg', duration: '3:28', previewStart: 53 },
      { id: 'tit-e18', num: 18, title: 'Reacting When Plans Change',                file: 'ThinkItThrough_E18_ReactingWhenPlansChange',              thumbnail: 'assets/thumbnails/ThinkItThrough_E18_ReactingWhenPlansChange.jpg', duration: '3:16', previewStart: 50 },
      { id: 'tit-e19', num: 19, title: 'Deciding Whether to Include Someone',       file: 'ThinkItThrough_E19_DecidingWhetherToIncludeSomeone',      thumbnail: 'assets/thumbnails/ThinkItThrough_E19_DecidingWhetherToIncludeSomeone.jpg', duration: '3:51', previewStart: 59 },
      { id: 'tit-e20', num: 20, title: 'Handling Mistakes',                         file: 'ThinkItThrough_E20_HandlingMistakes',                     thumbnail: 'assets/thumbnails/ThinkItThrough_E20_HandlingMistakes.jpg', duration: '3:22', previewStart: 52 },
      { id: 'tit-e21', num: 21, title: "Deciding What's Fair",                      file: 'ThinkItThrough_E21_DecidingWhatsFair',                    thumbnail: 'assets/thumbnails/ThinkItThrough_E21_DecidingWhatsFair.jpg', duration: '3:45', previewStart: 57 },
      { id: 'tit-e22', num: 22, title: 'Choosing to Calm Down Before Acting',       file: 'ThinkItThrough_E22_ChoosingToCalmDownBeforeActing',       thumbnail: 'assets/thumbnails/ThinkItThrough_E22_ChoosingToCalmDownBeforeActing.jpg', duration: '3:08', previewStart: 48 },
      { id: 'tit-e23', num: 23, title: 'Following Instructions or Improvising',     file: 'ThinkItThrough_E23_FollowingInstructionsOrImprovising',   thumbnail: 'assets/thumbnails/ThinkItThrough_E23_FollowingInstructionsOrImprovising.jpg', duration: '3:58', previewStart: 61 },
      { id: 'tit-e24', num: 24, title: 'Deciding When to Stop Playing',             file: 'ThinkItThrough_E24_DecidingWhenToStopPlaying',            thumbnail: 'assets/thumbnails/ThinkItThrough_E24_DecidingWhenToStopPlaying.jpg', duration: '3:14', previewStart: 50 },
      { id: 'tit-e25', num: 25, title: 'Choosing How to Solve a Problem',           file: 'ThinkItThrough_E25_ChoosingHowToSolveAProblem',           thumbnail: 'assets/thumbnails/ThinkItThrough_E25_ChoosingHowToSolveAProblem.jpg', duration: '3:39', previewStart: 56 },
    ]
  },
];

// Featured rows: first row is "Featured" with random episodes from all shows,
// then one row per show with all episodes
function buildFeaturedRows() {
  // Collect all episodes with show references, shuffle, pick a selection
  const allEpisodes = [];
  SHOWS.forEach(show => {
    show.episodes.forEach(ep => allEpisodes.push({ ...ep, _showId: show.id }));
  });
  // Fisher-Yates shuffle
  for (let i = allEpisodes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allEpisodes[i], allEpisodes[j]] = [allEpisodes[j], allEpisodes[i]];
  }

  const rows = [
    { label: 'Featured', showId: 'featured', episodes: allEpisodes },
    ...SHOWS.map(show => ({
      label: show.title,
      showId: show.id,
      episodes: show.episodes,
    }))
  ];
  return rows;
}

const FEATURED_ROWS = buildFeaturedRows();

// Characters (limited to 8 with full builder images)
const CHARACTERS = [
  { id: 'plink', name: 'Plink', thumbnail: 'assets/characters/thumbs/Thumb - Plink.png', fullImage: 'assets/characters/full/Large - Plink.png' },
  { id: 'rook', name: 'Rook', thumbnail: 'assets/characters/thumbs/Thumb - Rook.png', fullImage: 'assets/characters/full/Large - Rook.png' },
  { id: 'jax', name: 'Jax', thumbnail: 'assets/characters/thumbs/Thumb - Jax.png', fullImage: 'assets/characters/full/Large - Jax.png' },
  { id: 'lena', name: 'Lena', thumbnail: 'assets/characters/thumbs/Thumb - Lena.png', fullImage: 'assets/characters/full/Large - Lena.png' },
  { id: 'sol', name: 'Sol', thumbnail: 'assets/characters/thumbs/Thumb - Sol.png', fullImage: 'assets/characters/full/Large - Sol.png' },
  { id: 'dash', name: 'Dash', thumbnail: 'assets/characters/thumbs/Thumb - Dash.png', fullImage: 'assets/characters/full/Large - Dash.png' },
  { id: 'echo', name: 'Echo', thumbnail: 'assets/characters/thumbs/Thumb - Echo.png', fullImage: 'assets/characters/full/Large - Echo.png' },
  { id: 'ari', name: 'Ari', thumbnail: 'assets/characters/thumbs/Thumb - Ari.png', fullImage: 'assets/characters/full/Large - Ari.png' },
];

// ── Character Name Mapping: V3 Frontend → Unity WebGL Model IDs ──
// The Unity build uses placeholder character model names internally.
// This map translates our front-end character IDs to the Unity model IDs
// so the correct 3D model loads when a character is selected in the builder.
//
// TESTING REFERENCE — Character Mappings:
//   Front-end "Plink"  → Unity "peasant-girl"
//   Front-end "Rook"   → Unity "the-boss"
//   Front-end "Jax"    → Unity "aj"
//   Front-end "Lena"   → Unity "maria"
//   Front-end "Sol"    → Unity "sporty-grrl"
//   Front-end "Dash"   → Unity "joe"
//   Front-end "Echo"   → Unity "lola"
//   Front-end "Ari"    → Unity "kaya"
//
const CHARACTER_WEBGL_MAP = {
  'plink': 'peasant-girl',
  'rook':  'the-boss',
  'jax':   'aj',
  'lena':  'claire',
  'sol':   'big-vegas',
  'dash':  'sporty-granny',
  'echo':  'ty',
  'ari':   'x-bot',
};

const SHOW_CHARACTERS = {
  'wonder-words': ['plink', 'echo', 'ari'],
  'why-things-happen': ['sol', 'rook', 'jax'],
  'big-feelings': ['dash', 'lena', 'plink'],
  'think-it-through': ['ari', 'echo', 'sol'],
};

const ENVIRONMENTS = [
  { id: 'schoolyard', name: 'Schoolyard', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_Schoolyard.png', fullImage: 'assets/environments/full/Environment_Schoolyard.jpg' },
  { id: 'playroom', name: 'Playroom', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_Playroom.png', fullImage: 'assets/environments/full/Environment_Playroom.jpg' },
  { id: 'classroom', name: 'Classroom', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_Classroom.png', fullImage: 'assets/environments/full/Environment_Classroom.jpg' },
  { id: 'backyard', name: 'Backyard', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_Backyard.png', fullImage: 'assets/environments/full/Environment_Backyard.jpg' },
  { id: 'campground', name: 'Campground', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_Campground.png', fullImage: 'assets/environments/full/Environment_Campground.jpg' },
  { id: 'playground-park', name: 'Playground Park', thumbnail: 'assets/environments/thumbs/EnvironmentThumb_PlaygroundPark.png', fullImage: 'assets/environments/full/Environment_PlaygroundPark.jpg' },
];

// Settings categories for the Settings screen
const SETTINGS_CATEGORIES = [
  { id: 'account', label: 'Account', icon: 'account' },
  { id: 'parental', label: 'Parental Controls', icon: 'parental' },
  { id: 'about', label: 'About', icon: 'about' },
];

const SETTINGS_DETAILS = {
  account: {
    title: 'Account Settings',
    rows: [
      { label: 'Profile Name', value: 'User 1', type: 'text' },
      { label: 'Email', value: 'user@example.com', type: 'text' },
      { label: 'Subscription', value: 'Premium', type: 'text' },
      { type: 'divider' },
      { label: 'Auto-play next episode', value: true, type: 'toggle' },
      { label: 'Show watch history', value: true, type: 'toggle' },
      { type: 'divider' },
      { type: 'buttons', buttons: ['Edit Profile', 'Log Out'] },
    ],
  },
  parental: {
    title: 'Parental Controls',
    rows: [
      { label: 'Require PIN', value: false, type: 'toggle' },
      { label: 'Content Rating', value: 'All Ages', type: 'text' },
      { label: 'Screen Time Limit', value: '60 min', type: 'text' },
      { type: 'divider' },
      { label: 'Block Search', value: false, type: 'toggle' },
    ],
  },
  about: {
    title: 'About',
    rows: [
      { label: 'Version', value: '1.0.0', type: 'text' },
      { label: 'Build', value: '2026.03', type: 'text' },
      { label: 'Platform', value: 'Smart TV', type: 'text' },
    ],
  },
};
