import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import PropTypes, { } from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createNewUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    };
    const loginUser = (email, pass) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, pass);
    };
    const logOutUser = () => {
        setLoader(true);
        return signOut(auth);
    };

    const loginWIthGoogle = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };
    const updateUser =(profile)=>{
        return updateProfile(auth.currentUser, profile)
    }
    // haah 
    // const updateUser = async (profile) => {
    //     await updateProfile(auth.currentUser, profile);
    //     await auth.currentUser.reload();
    //     const updatedUser = auth.currentUser;
    //     setUser({ ...updatedUser });
    // };
    // haha 
    const alValues = {
        user,
        setUser,
        createNewUser, loginUser, logOutUser, loginWIthGoogle, updateUser, loader,
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false)
        });
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <AuthContext.Provider value={alValues}>
            {children}
            <ToastContainer></ToastContainer>
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;