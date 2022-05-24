import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import 'twin.macro';
import Button from '../../Utils/Button';

interface EditProfileInterface {
    isOpen: boolean;
    setIsOpen: any;
    handleConfirm: any;
    defaultName: string;
    defaultDescription: string;
}

const EditProfileModal: React.FC<EditProfileInterface> = (props) => {
    const [businessName, setBusinessName] = useState(props.defaultName);
    const [businessDescription, setBusinessDescription] = useState(props.defaultDescription);
    const [lengthBusinessDescription, setLengthBusinessDescription] = useState((props.defaultDescription).length)
    

    function closeModal() {
        props.setIsOpen(false)
    }
    return(
        <div tw="">
            <Dialog open={props.isOpen} onClose={closeModal} tw="overflow-auto bg-gray-500">
                <Dialog.Overlay onClick={closeModal} tw="w-full h-screen bg-gray-500 overflow-auto">

                <div tw={"fixed inset-0 m-auto flex items-center justify-self-center w-2/5"}>

                <div tw="w-full shadow-lg bg-white rounded items-center justify-center p-2">
                        <div tw="flex justify-between mx-4 mt-4 mb-8">
                            <Dialog.Title tw="font-bold text-4xl">
                                Edit Profile
                            </Dialog.Title>
                            {/* <button onClick={closeModal} tw="font-bold px-0 py-1 rounded-full border border-gray-200 border-2 w-1/12 hover:bg-black hover:bg-opacity-30 hover:text-white">
                                X
                            </button> */}
                        </div>
                        <div tw="mx-4 my-3">
                            <form tw="h-full" onSubmit={(e:any) => {e.preventDefault(); props.handleConfirm(businessName, businessDescription)}}>
                                <div tw="my-3">
                                    <div tw="mb-1">
                                        <label tw="font-bold text-lg">
                                            Nama Bisnis
                                        </label>
                                    </div>
                                    <div>
                                        <input tw="border border-2 border-gray-500 py-1 px-3 w-full rounded font-medium" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} minLength={3}/>
                                    </div>
                                </div>

                                <div tw="mt-3 mb-2">
                                    <div tw="mb-1">
                                        <label tw="font-bold text-lg">
                                            Deskripsi Bisnis
                                        </label>
                                    </div>
                                    <div tw="h-60">
                                        <textarea tw="border border-gray-500 border-2 py-1 px-3 w-full h-full rounded" value={businessDescription} onChange={(e) => {setBusinessDescription(e.target.value); setLengthBusinessDescription(e.target.value.length)}} maxLength={500}/>
                                    </div>
                                        
                                    <div tw="flex justify-end m-0 p-0 font-semibold">
                                        {lengthBusinessDescription}/500
                                    </div>
                                </div>

                                <div tw="flex justify-between mt-6 mb-6">
                                    <div tw="mx-2 w-full">
                                        <Button type="submit"> Simpan Perubahan</Button>
                                    </div>
                                    <div tw="mx-2 w-full">
                                        <Button buttonType="secondary" color="" onClick={()=>{setBusinessName(props.defaultName); setBusinessDescription(props.defaultDescription); closeModal()}}>Batal</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
        
                </div>

                </Dialog.Overlay>
            </Dialog>
        </div>
    )
}

export default EditProfileModal