
import express from 'express'
import multer from "multer"
import path, { resolve } from "path"
import { loginPage, profilePage, registarPage, registarUser , loginUser, logoutUser , userVerification, sendVerification, accountActivatinUser , profilePhotoPage, changePassword ,editPage, profilePhotoUpdate, profileGalleryPage,profileGalleryUpdate,editPageUpdate, changeOldPassword, findFriends, singleFriendsPage, followUser, unfollowUser, forgetAccount, forgetAccountpost, resetPasswordOtp, continueHome, passwordAlreadyChanged, passwordPage,profileEditPage,createPage, createPost} from '../controller/userControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authRedirectMiddleware } from '../middleware/authRedirectMiddleware.js';


//router init
const router = express.Router();
const __dirname = resolve()


//multer configure
 const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        console.log(file);
       
    cb(null, path.join(__dirname,'/public/media/users'))

    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname );

    }
})


//create multer middleware
const profilePhotoUploadMulter = multer({
    storage : storage
}).single('profile');

const postphotoMulter = multer({
    storage : storage
}).single('pphoto');


const gallaryPhotoUploadMulter = multer({
    storage : storage
}).array('gallery', 10)




//routes
router.get('/', authRedirectMiddleware, profilePage);
router.get('/create', authRedirectMiddleware,  createPage);
router.post('/create',postphotoMulter, createPost);
router.get('/profileEdit', authRedirectMiddleware,  profileEditPage)
router.post('/profileEdit', profilePhotoUploadMulter,  profilePhotoUpdate)

//photo update
router.get('/photo-update', authRedirectMiddleware,  profilePhotoPage)
// router.post('/photo-update', profilePhotoUploadMulter,  profilePhotoUpdate)

//gallery update
router.get('/gallery-update', authRedirectMiddleware,  profileGalleryPage)
router.post('/gallery-update', gallaryPhotoUploadMulter,  profileGalleryUpdate)


router.get('/password-change',   changePassword)
// router.post('/password-change', authRedirectMiddleware,  changeOldPassword)
router.get('/profile-change', authRedirectMiddleware,  editPage)
router.post('/profile-change', authRedirectMiddleware,  editPageUpdate)
router.get('/find-friends', authRedirectMiddleware,  findFriends)
router.get('/user/:id', authRedirectMiddleware,  singleFriendsPage)
router.get('/follow/:id', authRedirectMiddleware,  followUser)
router.get('/unfollow/:id', authRedirectMiddleware,  unfollowUser)

router.get('/forgat', forgetAccount)
router.post('/forgat/:id', forgetAccountpost)
router.get('/reset', resetPasswordOtp)
router.get('/reset', continueHome);
router.get('/pasword', passwordPage);
router.post('/pasword', changeOldPassword)
router.get('/changedPasswords', passwordAlreadyChanged)







router.get('/login', authMiddleware, loginPage)
router.get('/registar', authMiddleware, registarPage)
router.post('/registar', registarUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/activate/:token', accountActivatinUser)
router.get('/verification', userVerification)
router.post('/verification', sendVerification)







//exporting
export default router