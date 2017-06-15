/*
 Navicat Premium Data Transfer

 Source Server         : ONAP-Dev PostgreSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 90502
 Source Host           : ads-d-lnx-pgr.eastus2.cloudapp.azure.com
 Source Database       : onapdev
 Source Schema         : onap

 Target Server Type    : PostgreSQL
 Target Server Version : 90502
 File Encoding         : utf-8

 Date: 08/08/2016 16:40:04 PM
*/

-- ----------------------------
--  Table structure for "trbl_afltn"
-- ----------------------------
DROP TABLE IF EXISTS "trbl_afltn";
CREATE TABLE "trbl_afltn" (
	"trbl_afltn_cd" varchar(4) NOT NULL,
	"trbl_afltn_nm" varchar(40)
)
WITH (OIDS=FALSE);
ALTER TABLE "trbl_afltn" OWNER TO "onap";

-- ----------------------------
--  Records of "trbl_afltn"
-- ----------------------------
BEGIN;
INSERT INTO "trbl_afltn" VALUES ('CHRK', 'Cherokee');
INSERT INTO "trbl_afltn" VALUES ('CHKA', 'Chickasaw');
COMMIT;

-- ----------------------------
--  Primary key structure for table "trbl_afltn"
-- ----------------------------
ALTER TABLE "trbl_afltn" ADD CONSTRAINT "xpktrbl_afltn" PRIMARY KEY ("trbl_afltn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

