CREATE TABLE `blog_user` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `remark` text,
  `last_login_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `blog_article` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `user_id` int(10) NOT NULL,
  `thumb` varchar(200) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `markdown` text,
  `content` text,
  `create_time` bigint(20) NOT NULL,
  `modify_time` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `blog_cate` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cate` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `blog_cate_article` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cate_id` int(10) NOT NULL,
  `article_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `blog_comment` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `article_id` int(10) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `text` text,
  `parent_id` int(10) DEFAULT NULL,
  `create_time` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;