import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, updateUserAPI} from "~/redux/user/userSlice.js";
import {singleFileValidator} from "~/utils/validators.js";
import {toast} from "react-toastify";

const Account = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)

    const [email, setEmail] = useState("")
    const [displayName, setDisplayname] = useState("")
    const [gender, setGender] = useState("")
    const [preview, setPreview] = useState(null)

    // khi currentUser thay đổi, fill vào form
    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email || "")
            setDisplayname(currentUser.displayName || "")
            setGender(currentUser.gender || "")
        }
    }, [currentUser])

    const handleUpdate = () => {
        const updatedData = {
            email,
            displayName,
            gender
        }
        dispatch(updateUserAPI(updatedData))
    }

    const uploadAvatar = (e) => {
        // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
        // console.log('e.target?.files[0]: ', e.target?.files[0])
        const error = singleFileValidator(e.target?.files[0])
        if (error) {
            toast.error(error)
            return
        }

        setPreview(URL.createObjectURL(e.target?.files[0]))

        // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
        let reqData = new FormData()
        reqData.append('avatar', e.target?.files[0]) // append file với key avatar
        // Cách để log được dữ liệu thông qua FormData
        // console.log('reqData: ', reqData)
        // for (const value of reqData.values()) {
        //   console.log('reqData Value: ', value)
        // }

        // Gọi API...
        toast.promise(
            dispatch(updateUserAPI(reqData)),
            { pending: 'Updating...' }
        ).then(res => {
            // nếu không có lỗi (update thành công)
            if (!res.error) {
                toast.success('User updated succesfully')
                setPreview(null)
            }
            // Clear giá trị file input dù có lỗi hay không, tránh trường hợp không thể chọn cùng 1 file liên tiếp
            e.target.value = ''
        })
    }

    return (
        <div className="h-full">
            <div className="account-header">
                <div className="title">Account</div>
                <p className="desc">Update account information</p>
            </div>
            <div className="account-body">
                <div className="body-section">
                    <div className="flex flex-col mb-6">
                        <label className="inline-block mb-2 text-xs text-static-grey-9" htmlFor="">Email</label>
                        <input
                            className="email-input"
                            type="text"
                            value={email}
                            disabled // thường email không cho sửa
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="inline-block mb-2 text-xs text-static-grey-9" htmlFor="">User Name</label>
                        <input
                            className="name-input"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayname(e.target.value)}
                        />
                    </div>
                    <div className="block mb-12">
                        <label className="block mb-4 text-xs text-static-grey-9" htmlFor="">Gender</label>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="float-left size-3.5 ml-[-21px] mt-[6.5px] cursor-pointer"
                                checked={gender === "male"}
                                onChange={() => setGender("male")}
                            />
                            <label className="inline-block text-sm font-normal text-static-grey-9" htmlFor="">Male</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="float-left size-3.5 ml-[-21px] mt-[6.5px] cursor-pointer"
                                checked={gender === "female"}
                                onChange={() => setGender("female")}
                            />
                            <label className="inline-block text-sm font-normal text-static-grey-9" htmlFor="">Female</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="float-left size-3.5 ml-[-21px] mt-[6.5px] cursor-pointer"
                                checked={gender === "other"}
                                onChange={() => setGender("other")}
                            />
                            <label className="inline-block text-sm font-normal text-static-grey-9" htmlFor="">???</label>
                        </div>
                    </div>
                    <div className="body-btn">
                        <button className="button" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                    <p className="mt-12 mb-4 text-sm font-normal text-static-grey-9">
                        Press <a className="text-[#FFD875] cursor-pointer" href="/404"> here</a> to change your password
                    </p>
                </div>
                <div className="text-center shrink-0">
                    <div className="relative w-[120px] h-[120px] border-2 shrink-0 overflow-hidden bg-background-user-black rounded-search cursor-pointer">
                        <img
                            className="absolute w-full h-full object-cover"
                            src={preview || currentUser?.avatar || "https://res.cloudinary.com/doam999z1/image/upload/v1752230418/3vjpg_aemnc5.jpg"}
                            alt="avatar"
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={uploadAvatar}
                        />
                        <label
                            htmlFor="avatarUpload"
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                        >
                            Upload Avatar
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account
