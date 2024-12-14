import { SigninProps, CreateUserInfo, TokenProps } from '@/models/user'
import axios from 'axios'
import useUserStore from '@/store/useUserStore'

//회원가입 요청
export const createAccount = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/signup/',
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const login = async (userData: SigninProps) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/login/',
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const getUser = async (username: string, accessToken: string) => {
    try {
        const response = await axios.get(
            `http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            if (e.status === 401) {
                console.log('토큰 만료 에러')
            }
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const refreshToken = async (refresh: string) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/token/refresh/',
            { refresh: refresh },
            {
                headers: {
                    Authorization: `Bearer ${refresh}`,
                },
            },
        )
        console.log(response.data)

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const replaceNickName = async (user: string, after: string) => {
    try {
        const response = await axios.put(
            `http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/update-nickname/${user}/`,
            { nickname: after },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const deleteUser = async (user: string) => {
    try {
        const response = await axios.delete(
            `http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/${user}/`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        )

        return response
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}

export const addOnboarding = async (data: { [key: string]: string[] }) => {
    try {
        const response = await axios.put(
            `http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/onboarding/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}
