import { useContext } from 'react'
import NotificationContext from "../contexts/NotificationContext";

const useNotification = () => useContext(NotificationContext)

export default useNotification
