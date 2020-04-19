import {
    HomeOutlined,
    UserOutlined
} from '@ant-design/icons';

const menus = [
    {
        title:"首页",
        path:"/home",
        // icon:<HomeOutlined />
        icon:HomeOutlined,
		// 菜单显示级别（1：都能看到；2：部分用户能看；3：只有管理员可以看）
		permission:1
    },
    {
        title:"用户管理",
        path:"/user/users",
        icon:UserOutlined,
		permission:3,
        // 有子菜单：
        children:[
            {
                title:"用户列表",
                path:"/user/users",
                icon:UserOutlined 
            }
        ]
    },
    {
        title:"文章管理",
        path:"/article",
        icon:UserOutlined,
		permission:1,
        // 有子菜单：
        children:[
            {
                title:"文章列表",
                path:"/article/list",
                icon:UserOutlined,
				 permission:1
            },
            {
                title:"文章分类",
                path:"/article/category",
                icon:UserOutlined ,
				permission:2
            }
        ]
    },
    {
        title:"权限管理",
        path:"/rights",
        icon:UserOutlined,
		permission:3,
        // 有子菜单：
        children:[
            {
                title:"角色列表",
                path:"/rights/role",
                icon:UserOutlined ,
				permission:3
            },
            {
                title:"权限列表",
                path:"/rights/right",
                icon:UserOutlined,
				permission:3
            }
        ]
    }
]

export default menus