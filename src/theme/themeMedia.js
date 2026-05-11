import dancingSticker from '../assets/CatDancingStickerbyWEPLAYMusicGmbH-ezgif.com-gif-to-webp-converter.webp'
import happyCollageImage from '../assets/happy/17NbE3-tbi15j5WCFYnx2jg.png'
import whisperOfTheHeartVideo from '../assets/happy/anime-whisper-of-the-heart.mp4'
import howlMovingCastleVideo from "../assets/happy/howl’s-moving-castle-anime.mp4"
import kimiNoNaWaImage from '../assets/happy/kimi-no-na-wa.jpg'
import musicRecordVideo from '../assets/happy/music-record.mp4'
import weatheringWithYouImage from '../assets/happy/weathering-with-you-.jpg'
import carImage from '../assets/crzy/car.png'
import nightDriveImage from '../assets/crzy/night-drive.webp'
import puterImage from '../assets/crzy/puter.png'
import sailorMoonTuxedoImage from '../assets/crzy/sailor-moon-tuxedo.webp'
import taxiImage from '../assets/crzy/taxi.png'
import windowImage from '../assets/crzy/window.png'
import twoPacImage from '../assets/streets/2pac.png'
import biggieImage from '../assets/streets/biggie.png'
import eminemConcertVideo from '../assets/streets/eminem-concert.mp4'
import filthyFrankTeethVideo from '../assets/streets/filthy-frank-teeth.mp4'
import iceCubeVideo from '../assets/streets/ice-cube.mp4'
import iceImage from '../assets/streets/ice.png'
import missinBackground from '../assets/BG/MissinyouCrazyBG.png'
import writeThisDownBackground from '../assets/BG/WritethisDownBG.jpg'

const picture = (id, src, className, frameVariant, animate) => ({
  id,
  kind: 'picture',
  src,
  className,
  frameVariant,
  animate,
})

const video = (id, src, className, frameVariant, animate) => ({
  id,
  kind: 'video',
  src,
  className,
  frameVariant,
  animate,
})

const imageOverlay = (src, frameVariant, shellClassName) => ({
  kind: 'image',
  src,
  frameVariant,
  shellClassName,
})

export const sectionMediaByTheme = {
  happiness: {
    about: [
      picture('happy-about-left', kimiNoNaWaImage, 'section-media section-media--about-left', 'happiness', { y: [0, -10, 0], rotate: [-4, -1, -4] }),
      picture('happy-about-right', weatheringWithYouImage, 'section-media section-media--about-right', 'happiness', { y: [0, 12, 0], rotate: [4, 6, 4] }),
    ],
    'selected-works': [
      picture('happy-works-right', happyCollageImage, 'section-media section-media--works-right', 'happiness', { y: [0, -8, 0], rotate: [-3, 0, -3] }),
    ],
    skills: [
      picture('happy-skills-left', kimiNoNaWaImage, 'section-media section-media--skills-left', 'happiness', { y: [0, 9, 0], rotate: [-4, -1, -4] }),
      picture('happy-skills-right', weatheringWithYouImage, 'section-media section-media--skills-right', 'happiness', { y: [0, -10, 0], rotate: [4, 7, 4] }),
      video('happy-skills-video', whisperOfTheHeartVideo, 'section-media section-media--skills-video', 'happiness', { y: [0, 8, 0], rotate: [-3, 1, -3] }),
    ],
    education: [
      picture('happy-education-right', happyCollageImage, 'section-media section-media--education-right', 'happiness', { y: [0, 8, 0], rotate: [3, 5, 3] }),
      video('happy-education-video', howlMovingCastleVideo, 'section-media section-media--education-video', 'happiness', { y: [0, -8, 0], rotate: [2, 4, 2] }),
    ],
    contact: [
      picture('happy-contact-left', weatheringWithYouImage, 'section-media section-media--contact-left', 'happiness', { y: [0, -9, 0], rotate: [-4, -2, -4] }),
      picture('happy-contact-right', kimiNoNaWaImage, 'section-media section-media--contact-right', 'happiness', { y: [0, 10, 0], rotate: [5, 7, 5] }),
      video('happy-contact-video', musicRecordVideo, 'section-media section-media--contact-video', 'happiness', { y: [0, 10, 0], rotate: [-2, 2, -2] }),
    ],
  },
  'missin-you-crazy': {
    about: [
      picture('missin-about-left', sailorMoonTuxedoImage, 'section-media section-media--about-left', 'missin', { y: [0, -10, 0], rotate: [-4, -1, -4] }),
      picture('missin-about-right', windowImage, 'section-media section-media--about-right', 'missin', { y: [0, 12, 0], rotate: [4, 6, 4] }),
    ],
    'selected-works': [
      picture('missin-works-right', puterImage, 'section-media section-media--works-right', 'missin', { y: [0, -8, 0], rotate: [-3, 0, -3] }),
    ],
    skills: [
      picture('missin-skills-left', missinBackground, 'section-media section-media--skills-left', 'missin', { y: [0, 9, 0], rotate: [-4, -1, -4] }),
      picture('missin-skills-right', taxiImage, 'section-media section-media--skills-right', 'missin', { y: [0, -10, 0], rotate: [4, 7, 4] }),
    ],
    education: [
      picture('missin-education-right', nightDriveImage, 'section-media section-media--education-right', 'missin', { y: [0, 8, 0], rotate: [3, 5, 3] }),
    ],
    contact: [
      picture('missin-contact-left', missinBackground, 'section-media section-media--contact-left', 'missin', { y: [0, -9, 0], rotate: [-4, -2, -4] }),
      picture('missin-contact-right', carImage, 'section-media section-media--contact-right', 'missin', { y: [0, 10, 0], rotate: [5, 7, 5] }),
    ],
  },
  'hip-hop-mix': {
    about: [
      picture('hiphop-about-left', biggieImage, 'section-media section-media--about-left', 'hiphop', { y: [0, -10, 0], rotate: [-4, -1, -4] }),
      picture('hiphop-about-right', writeThisDownBackground, 'section-media section-media--about-right', 'hiphop', { y: [0, 12, 0], rotate: [4, 6, 4] }),
    ],
    'selected-works': [
      picture('hiphop-works-right', twoPacImage, 'section-media section-media--works-right', 'hiphop', { y: [0, -8, 0], rotate: [-3, 0, -3] }),
      video('hiphop-works-video', filthyFrankTeethVideo, 'section-media section-media--works-video', 'hiphop', { y: [0, 6, 0], rotate: [2, 5, 2] }),
    ],
    skills: [
      picture('hiphop-skills-left', biggieImage, 'section-media section-media--skills-left', 'hiphop', { y: [0, 9, 0], rotate: [-4, -1, -4] }),
      picture('hiphop-skills-right', iceImage, 'section-media section-media--skills-right', 'hiphop', { y: [0, -10, 0], rotate: [4, 7, 4] }),
      video('hiphop-skills-video', eminemConcertVideo, 'section-media section-media--skills-video', 'hiphop', { y: [0, 8, 0], rotate: [-2, 1, -2] }),
    ],
    education: [
      picture('hiphop-education-right', writeThisDownBackground, 'section-media section-media--education-right', 'hiphop', { y: [0, 8, 0], rotate: [3, 5, 3] }),
      video('hiphop-education-video', iceCubeVideo, 'section-media section-media--education-video', 'hiphop', { y: [0, -7, 0], rotate: [1, 4, 1] }),
    ],
    contact: [
      picture('hiphop-contact-left', twoPacImage, 'section-media section-media--contact-left', 'hiphop', { y: [0, -9, 0], rotate: [-4, -2, -4] }),
      picture('hiphop-contact-right', iceImage, 'section-media section-media--contact-right', 'hiphop', { y: [0, 10, 0], rotate: [5, 7, 5] }),
    ],
  },
}

export const musicOverlayByTheme = {
  happiness: imageOverlay(dancingSticker, 'happiness', 'music-section__media-shell music-section__media-shell--happiness'),
  'missin-you-crazy': imageOverlay(dancingSticker, 'missin', 'music-section__media-shell music-section__media-shell--missin'),
  'hip-hop-mix': imageOverlay(dancingSticker, 'hiphop', 'music-section__media-shell music-section__media-shell--hiphop'),
}