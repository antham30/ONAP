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

 Date: 08/08/2016 16:46:23 PM
*/

-- ----------------------------
--  Sequence structure for "hibernate_sequence"
-- ----------------------------
DROP SEQUENCE IF EXISTS "hibernate_sequence";
CREATE SEQUENCE "hibernate_sequence" INCREMENT 1 START 1 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;

-- ----------------------------
--  Table structure for "sec184_aprvd_stat_cd"
-- ----------------------------
DROP TABLE IF EXISTS "sec184_aprvd_stat_cd";
CREATE TABLE "sec184_aprvd_stat_cd" (
	"sec184_aprvd_stat_cd" char(1) NOT NULL,
	"sec184_aprvd_stat_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "sec184_aprvd_stat_cd"
-- ----------------------------
BEGIN;
INSERT INTO "sec184_aprvd_stat_cd" VALUES ('P', 'Partial State');
INSERT INTO "sec184_aprvd_stat_cd" VALUES ('F', 'Full State');
INSERT INTO "sec184_aprvd_stat_cd" VALUES ('N', 'None');
INSERT INTO "sec184_aprvd_stat_cd" VALUES ('1', '184A');
COMMIT;

-- ----------------------------
--  Table structure for "addr"
-- ----------------------------
DROP TABLE IF EXISTS "addr";
CREATE TABLE "addr" (
	"addr_id" int4 NOT NULL,
	"addr_str_nbr" char(10),
	"addr_str_nm" varchar(40),
	"addr_str_nm_post_txt" varchar(10),
	"city_nm" varchar(28),
	"zip_5_cd" char(5) NOT NULL,
	"zip_plus_4_cd" char(4),
	"urbnztn_nm" varchar(35),
	"apt_nbr" varchar(8),
	"st_cd" char(2) NOT NULL,
	"cntr_cd" char(3),
	"frgn_addr_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"prvnc_nm" varchar(40),
	"pstl_cd" varchar(20)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "addr_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "addr_type_cd";
CREATE TABLE "addr_type_cd" (
	"addr_type_cd" char(1) NOT NULL,
	"addr_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "amrtztn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "amrtztn_cd";
CREATE TABLE "amrtztn_cd" (
	"amrtztn_type_cd" char(1) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "aprsl_firm"
-- ----------------------------
DROP TABLE IF EXISTS "aprsl_firm";
CREATE TABLE "aprsl_firm" (
	"aprsl_firm_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "aprsl_firm"
-- ----------------------------
BEGIN;
INSERT INTO "aprsl_firm" VALUES ('10');
COMMIT;

-- ----------------------------
--  Table structure for "aprsr"
-- ----------------------------
DROP TABLE IF EXISTS "aprsr";
CREATE TABLE "aprsr" (
	"aprsr_pre_lcnc_auth_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"aprsr_hud_trmntd_dt" date,
	"aprsr_id" int4 NOT NULL,
	"orgnztn_id" int4,
	"aprsl_firm_id" int4 NOT NULL,
	"std_aprsl_crtfd_ind" char(1) DEFAULT 'N'::bpchar,
	"st_lcncd_ind" char(1) DEFAULT 'N'::bpchar,
	"aprsr_last_rvw_dt" date,
	"aprsr_last_asgnd_dt" date,
	"aprsr_fld_rvw_auth_ind" char(1) DEFAULT 'N'::bpchar,
	"aprsr_case_ld_qt_ratio_pct" numeric(6,0),
	"aprsr_avlbl_ind" char(1) DEFAULT 'N'::bpchar,
	"aprsr_203k_crtfd_ind" char(1) DEFAULT 'N'::bpchar
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "aprsr"
-- ----------------------------
BEGIN;
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '234', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '235', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '236', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '237', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '238', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
INSERT INTO "aprsr" VALUES ('N', '2016-02-01', '239', '10', '10', 'Y', 'N', null, '2016-02-01', 'N', '10', 'N', 'N');
COMMIT;

-- ----------------------------
--  Table structure for "aprsr_lic_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "aprsr_lic_type_cd";
CREATE TABLE "aprsr_lic_type_cd" (
	"aprsr_lic_type_cd" char(1) NOT NULL,
	"aprsr_lic_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "aprsr_st_lic"
-- ----------------------------
DROP TABLE IF EXISTS "aprsr_st_lic";
CREATE TABLE "aprsr_st_lic" (
	"st_cd" char(2) NOT NULL,
	"aprsr_id" int4 NOT NULL,
	"aprsr_lic_type_cd" char(1) NOT NULL,
	"aprsr_st_lcnc_nbr" char(40),
	"aprsr_hud_exam_pass_dt" date,
	"aprsr_lic_isd_dt" date,
	"aprsr_lic_expr_dt" date
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "bndr"
-- ----------------------------
DROP TABLE IF EXISTS "bndr";
CREATE TABLE "bndr" (
	"bndr_id" int4 NOT NULL,
	"chck_in_dt" date,
	"loan_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "borrwr_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "borrwr_type_cd";
CREATE TABLE "borrwr_type_cd" (
	"borrwr_type_cd" char(18) NOT NULL,
	"borrwr_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "borrwr_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "borrwr_type_cd" VALUES ('1                 ', 'Primary');
INSERT INTO "borrwr_type_cd" VALUES ('2                 ', 'Coborrower');
COMMIT;

-- ----------------------------
--  Table structure for "brnch_stat_cd"
-- ----------------------------
DROP TABLE IF EXISTS "brnch_stat_cd";
CREATE TABLE "brnch_stat_cd" (
	"brnch_stat_cd" char(1) NOT NULL,
	"brnch_stat_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "brnch_stat_cd"
-- ----------------------------
BEGIN;
INSERT INTO "brnch_stat_cd" VALUES ('A', 'Active');
INSERT INTO "brnch_stat_cd" VALUES ('X', 'Auxiliary');
INSERT INTO "brnch_stat_cd" VALUES ('P', 'Primary Lending');
COMMIT;

-- ----------------------------
--  Table structure for "brnch_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "brnch_type_cd";
CREATE TABLE "brnch_type_cd" (
	"brnch_type_cd" char(1) NOT NULL,
	"brnch_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "brnch_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "brnch_type_cd" VALUES ('M', 'Main');
INSERT INTO "brnch_type_cd" VALUES ('P', 'Principal Branch');
COMMIT;

-- ----------------------------
--  Table structure for "case_stat_cd"
-- ----------------------------
DROP TABLE IF EXISTS "case_stat_cd";
CREATE TABLE "case_stat_cd" (
	"case_stat_cd" char(1) NOT NULL,
	"case_stat_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "case_stat_cd"
-- ----------------------------
BEGIN;
INSERT INTO "case_stat_cd" VALUES ('E', 'Escalated');
INSERT INTO "case_stat_cd" VALUES ('I', 'In Progress');
INSERT INTO "case_stat_cd" VALUES ('S', 'Selected for Review');
INSERT INTO "case_stat_cd" VALUES ('A', 'Assigned to Reviewer');
INSERT INTO "case_stat_cd" VALUES ('C', 'Review Complete');
INSERT INTO "case_stat_cd" VALUES ('N', 'New Case Applied');
INSERT INTO "case_stat_cd" VALUES ('D', 'Case Number Requested');
COMMIT;

-- ----------------------------
--  Table structure for "cnty_cd"
-- ----------------------------
DROP TABLE IF EXISTS "cnty_cd";
CREATE TABLE "cnty_cd" (
	"cnty_cd" char(3) NOT NULL,
	"cnty_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "undrwrtng_rprt"
-- ----------------------------
DROP TABLE IF EXISTS "undrwrtng_rprt";
CREATE TABLE "undrwrtng_rprt" (
	"undrwrtng_rprt_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "ethnct_cd"
-- ----------------------------
DROP TABLE IF EXISTS "ethnct_cd";
CREATE TABLE "ethnct_cd" (
	"ethnct_cd" char(1) NOT NULL,
	"ethnct_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "ethnct_cd"
-- ----------------------------
BEGIN;
INSERT INTO "ethnct_cd" VALUES ('1', 'Hispanic or Latino');
INSERT INTO "ethnct_cd" VALUES ('3', 'Not Furnished');
INSERT INTO "ethnct_cd" VALUES ('2', 'Not Hispanic or Latino');
COMMIT;

-- ----------------------------
--  Table structure for "gndr_cd"
-- ----------------------------
DROP TABLE IF EXISTS "gndr_cd";
CREATE TABLE "gndr_cd" (
	"gndr_cd" char(1) NOT NULL,
	"gndr_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "gndr_cd"
-- ----------------------------
BEGIN;
INSERT INTO "gndr_cd" VALUES ('M', 'Male');
INSERT INTO "gndr_cd" VALUES ('F', 'Female');
COMMIT;

-- ----------------------------
--  Table structure for "hud_orgnztn"
-- ----------------------------
DROP TABLE IF EXISTS "hud_orgnztn";
CREATE TABLE "hud_orgnztn" (
	"hud_orgnztn_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "hud_prgm"
-- ----------------------------
DROP TABLE IF EXISTS "hud_prgm";
CREATE TABLE "hud_prgm" (
	"hud_prgm_type_cd" char(4) NOT NULL,
	"hud_prgm_nm" varchar(40)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "hud_rgn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "hud_rgn_cd";
CREATE TABLE "hud_rgn_cd" (
	"hud_rgn_cd" char(2) NOT NULL,
	"hud_rgn_nm" varchar(25)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "land_ownrshp_cd"
-- ----------------------------
DROP TABLE IF EXISTS "land_ownrshp_cd";
CREATE TABLE "land_ownrshp_cd" (
	"land_ownrshp_cd" char(1) NOT NULL,
	"land_ownrshp_desc" varchar(250),
	"rstrctd_unrstrctd_ind" char(1) NOT NULL,
	"indvdl_trb_held" char(1) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "land_ownrshp_cd"
-- ----------------------------
BEGIN;
INSERT INTO "land_ownrshp_cd" VALUES ('1', 'Land Held in Trust for Tribes', 'Y', 'N');
INSERT INTO "land_ownrshp_cd" VALUES ('2', 'Land Held in Trust for Individuals', 'Y', 'N');
INSERT INTO "land_ownrshp_cd" VALUES ('3', 'Unrestricted (Fee) Land Within Indian Areas', 'N', 'N');
COMMIT;

-- ----------------------------
--  Table structure for "land_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "land_type_cd";
CREATE TABLE "land_type_cd" (
	"land_type_id" int4 NOT NULL,
	"land_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "land_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "land_type_cd" VALUES ('10', 'TRIBAL TRUST LAND');
INSERT INTO "land_type_cd" VALUES ('11', 'FEE SIMPLE LAND');
INSERT INTO "land_type_cd" VALUES ('12', 'TRIBAL LEASEHOLD');
COMMIT;

-- ----------------------------
--  Table structure for "lndr"
-- ----------------------------
DROP TABLE IF EXISTS "lndr";
CREATE TABLE "lndr" (
	"spnsr_lndr_id" int4,
	"pre_clsng_prcsng_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"lmtd_dnl_prtcptn_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"high_risk_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"hecm_pre_clsng_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"hecm_crtfd_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"hecm_crtfd_dt" date,
	"drct_endrsmnt_prcsng_ind" char(1) DEFAULT 'N'::bpchar,
	"nmls_id" int4,
	"fha_aprvl_dt" date,
	"fy_end_nm" date,
	"gnma_id" int4,
	"incrprtn_dt" date,
	"incrprtn_st_cd" char(2),
	"tax_idntfctn_nbr" int8,
	"rcrtfctn_id" int4,
	"imf_id" int4,
	"lndr_id" int4 NOT NULL,
	"ecsbndr_auth_ind" char(1),
	"lndr_ctgry_cd" char(1)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "lndr"
-- ----------------------------
BEGIN;
INSERT INTO "lndr" VALUES ('1', 'N', 'N', 'N', 'N', 'N', null, 'N', null, null, null, null, null, null, '920177969', null, null, '1001', null, 'N');
COMMIT;

-- ----------------------------
--  Table structure for "lndr_addr_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_addr_type_cd";
CREATE TABLE "lndr_addr_type_cd" (
	"lndr_addr_type_cd" char(1) NOT NULL,
	"lndr_addr_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_athrty"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_athrty";
CREATE TABLE "lndr_athrty" (
	"lndr_athrty_cd" char(1) NOT NULL,
	"lndr_id" int4 NOT NULL,
	"lndr_athrty_rqust_dt" date,
	"curr_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"lndr_athrty_aprvl_dt" date
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_athrty_cd"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_athrty_cd";
CREATE TABLE "lndr_athrty_cd" (
	"lndr_athrty_cd" char(1) NOT NULL,
	"lndr_athrty_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_rcrtfctn"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_rcrtfctn";
CREATE TABLE "lndr_rcrtfctn" (
	"rcrtfctn_due_dt" date,
	"rcrtfctn_id" int4 NOT NULL,
	"rcrtfctn_stat_cd" char(1) NOT NULL,
	"lndr_id" int4 NOT NULL,
	"ipa_id" int4
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_rcrtfctn_dfcncy"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_rcrtfctn_dfcncy";
CREATE TABLE "lndr_rcrtfctn_dfcncy" (
	"dfcncy_id" char(10) NOT NULL,
	"dfcncy_desc" varchar(250),
	"olapc_prpsd_rsltn_desc" varchar(250),
	"lndr_rsltn_desc" varchar(250),
	"rcrtfctn_id" int4 NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_rcrtfctn_step"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_rcrtfctn_step";
CREATE TABLE "lndr_rcrtfctn_step" (
	"rcrtfctn_step_nbr" numeric NOT NULL,
	"rcrtfctn_step_nm" varchar(40),
	"rcrtfctn_step_stat_cd" char(1) NOT NULL,
	"rcrtfctn_id" int4 NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "loan"
-- ----------------------------
DROP TABLE IF EXISTS "loan";
CREATE TABLE "loan" (
	"lndr_id" int4 NOT NULL,
	"prprty_id" int4 NOT NULL,
	"hoc_id" int4 NOT NULL,
	"onap_case_nbr" varchar(20),
	"loan_type_cd" char(1) NOT NULL,
	"loan_amt" numeric(19,4),
	"loan_term_nbr" int4,
	"inspctr_id" int4 NOT NULL,
	"aprsr_id" int4 NOT NULL,
	"prjctd_clsng_dt" date,
	"hud_rgn_cd" char(2) NOT NULL,
	"hud_fld_ofc_cd" char(2) NOT NULL,
	"loan_applctn_crtfctn_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"onap_case_nbr_asgnmt_dt" date,
	"aprsl_rcvd_dt" date,
	"loan_note_txt" varchar(255),
	"amrtztn_type_cd" char(1) NOT NULL,
	"cohort_nbr" varchar(20),
	"case_stat_cd" char(1) NOT NULL,
	"undrwrtng_type_cd" varchar(20) NOT NULL,
	"unrdwrtr_id" int4 NOT NULL,
	"loan_id" int4 NOT NULL,
	"loan_prps_cd" char(4)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan"
-- ----------------------------
BEGIN;
INSERT INTO "loan" VALUES ('1001', '1', '1', '4833255554', 'S', '417000.0000', '360', '4001', '234', '2016-01-11', 'NE', '5 ', '1', '2016-01-11', '2015-09-11', 'SFSDF', '1', '2015-002013', 'I', 'S', '1', '1', 'EXIS');
INSERT INTO "loan" VALUES ('1001', '1', '2', '3232288337', 'R', '234000.0000', '180', '4001', '235', '2016-01-11', 'NE', '5 ', '1', '2016-01-14', '2015-09-14', 'SFSDF', '2', '2015-001113', 'D', 'D', '1', '2', 'REFI');
INSERT INTO "loan" VALUES ('1001', '1', '3', '2611199228', 'N', '350000.0000', '120', '4001', '236', '2016-01-11', 'NE', '5 ', '1', '2016-01-15', '2015-08-15', 'SFSDF', '3', '2016-000113', 'I', 'S', '1', '3', 'RHAB');
INSERT INTO "loan" VALUES ('1001', '1', '4', '2659871234', 'H', '150000.0000', '180', '4001', '237', '2016-01-11', 'NE', '5 ', '1', '2016-01-23', '2015-10-23', 'SFSDF', '4', '2016-000235', 'D', 'D', '1', '4', 'EXRH');
COMMIT;

-- ----------------------------
--  Table structure for "loan_mortg"
-- ----------------------------
DROP TABLE IF EXISTS "loan_mortg";
CREATE TABLE "loan_mortg" (
	"mortg_wtht_fncl_lf_fee_amt" numeric(19,4),
	"mortg_with_fncl_lf_fee_amt" numeric(19,4),
	"mortg_pymnt_pi_amt" numeric(19,4),
	"pymnts_curr_ind" char(1) NOT NULL DEFAULT 'Y'::bpchar,
	"lg_fee_fncl_ind" char(1) NOT NULL DEFAULT 'Y'::bpchar,
	"real_est_txs_amt" numeric(19,4),
	"hzrd_fld_amt" numeric(19,4),
	"mortg_othr_amt" numeric(19,4),
	"wrnty_amt" numeric(19,4),
	"loan_to_val_ratio_pct" numeric(2,0),
	"cmbnd_loan_to_val_ratio_pct" numeric(2,0),
	"prem_mnthly_amt" numeric(19,4),
	"prem_upfrnt_rate_pct" numeric(2,0),
	"prem_anul_rate_pct" numeric(2,0),
	"sale_price_amt" numeric(19,4),
	"aprsd_amt" numeric(19,4),
	"grnd_rent_lean_fee_amt" numeric(19,4),
	"unpd_prncpl_blnc_amt" numeric(19,4),
	"curr_husng_expns_amt" numeric(19,4),
	"grs_incm_amt" numeric(19,4),
	"rqrmnt_tot_amt" numeric(19,4),
	"fxd_pymnt_tot_amt" numeric(19,4),
	"fxd_debt_to_incm_ratio_tot_amt" numeric(19,4),
	"grntee_fee_paid_in_cash_amt" numeric(19,4),
	"loan_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_mortg"
-- ----------------------------
BEGIN;
INSERT INTO "loan_mortg" VALUES ('100.0000', '100.0000', '1000.0000', 'Y', 'N', '4000.0000', '600.0000', '100.0000', '100.0000', '80', '80', '2500.0000', '4', '4', '250000.0000', '260000.0000', '1600.0000', '230000.0000', '1500.0000', '100000.0000', '90000.0000', '1600.0000', '60.0000', '2000.0000', '1');
COMMIT;

-- ----------------------------
--  Table structure for "loan_fnds_to_cls"
-- ----------------------------
DROP TABLE IF EXISTS "loan_fnds_to_cls";
CREATE TABLE "loan_fnds_to_cls" (
	"invstmnt_rqrd_amt" numeric(19,4),
	"ast_avlbl_tot_amt" numeric(19,4),
	"borrwr_clsng_cost_amt" numeric(19,4),
	"rsrv_mnth_cnt" int4,
	"slr_cntrbtn_pct" int4,
	"slr_cntrbtn_amt" numeric(19,4),
	"sale_cncsn_amt" numeric(19,4),
	"loan_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_fnds_to_cls"
-- ----------------------------
BEGIN;
INSERT INTO "loan_fnds_to_cls" VALUES ('230000.0000', '230000.0000', '6000.0000', '1', '1', '1.0000', '1.0000', '1');
COMMIT;

-- ----------------------------
--  Table structure for "prsn"
-- ----------------------------
DROP TABLE IF EXISTS "prsn";
CREATE TABLE "prsn" (
	"prsn_dob_dt" date,
	"prsn_ssn" char(9),
	"gndr_cd" char(1),
	"ethncty_cd" char(1),
	"prsn_dsbld_ind" char(1) DEFAULT 'N'::bpchar,
	"prsn_stdnt_ind" char(1) DEFAULT 'N'::bpchar,
	"prsn_rec_efctv_dt" date,
	"home_phne_num" int8,
	"work_phne_num" int8,
	"addr_id" int4,
	"prsn_id" int4 NOT NULL,
	"prsn_type_cd" char(1) NOT NULL,
	"hud_mstr_id" int8,
	"fax_phne_nbr" int8,
	"mrtl_stat_cd" char(1),
	"frst_nm" varchar(50),
	"mdl_nm" varchar(50),
	"last_nm" varchar(50),
	"nm_sfx_cd" varchar(10)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "prsn"
-- ----------------------------
BEGIN;
INSERT INTO "prsn" VALUES ('2016-01-19', '223197864', 'M', '2', 'N', 'N', null, null, null, null, '1', 'B', null, null, 'M', 'Bill', 'B', 'Gates', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '387164753', 'F', '2', 'N', 'N', null, null, null, null, '9001', 'O', null, null, 'M', 'Johnny', 'E', 'Banker', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '4', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '5', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '6', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '7', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '8', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '441876231', 'M', '2', 'N', 'N', null, null, null, null, '2', 'B', null, null, 'M', 'Deanna', 'A', 'Lucero', null);
INSERT INTO "prsn" VALUES ('2016-01-19', '381764634', 'F', '2', 'N', 'N', null, null, null, null, '3', 'B', null, null, 'M', 'Angelina', 'A', 'Jolie', null);
COMMIT;

-- ----------------------------
--  Table structure for "onap"
-- ----------------------------
DROP TABLE IF EXISTS "onap";
CREATE TABLE "onap" (
	"onap_id" int4 NOT NULL,
	"pih_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "onap_rgn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "onap_rgn_cd";
CREATE TABLE "onap_rgn_cd" (
	"onap_rgn_cd" char(1) NOT NULL,
	"onap_rgn_nm" varchar(40)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "onap_rgn_cd"
-- ----------------------------
BEGIN;
INSERT INTO "onap_rgn_cd" VALUES ('E', 'Eastern Woodlands');
INSERT INTO "onap_rgn_cd" VALUES ('A', 'Alaska');
INSERT INTO "onap_rgn_cd" VALUES ('S', 'Southwest');
INSERT INTO "onap_rgn_cd" VALUES ('P', 'Southern Plains');
INSERT INTO "onap_rgn_cd" VALUES ('N', 'Northern Plains');
INSERT INTO "onap_rgn_cd" VALUES ('H', 'Hawaii');
INSERT INTO "onap_rgn_cd" VALUES ('W', 'Northwest');
COMMIT;

-- ----------------------------
--  Table structure for "orgnztn"
-- ----------------------------
DROP TABLE IF EXISTS "orgnztn";
CREATE TABLE "orgnztn" (
	"tax_idntfctn_nbr" char(9),
	"orgnztn_nm" varchar(40),
	"orgnztn_crtfctn_dt" date,
	"orgnztn_eml_addr_txt" varchar(60),
	"orgnztn_desc_txt" varchar(500),
	"duns_nbr" int8,
	"orgnztn_phon_nbr" char(10),
	"orgnztn_id" int4 NOT NULL,
	"orgnztn_type_cd" char(1) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "orgnztn"
-- ----------------------------
BEGIN;
INSERT INTO "orgnztn" VALUES ('123456789', 'TESTAPPRAISER', '2016-01-01', null, 'ONAPTEST', '1234567890', '1112223333', '10', 'A');
COMMIT;

-- ----------------------------
--  Table structure for "orgnztn_addr"
-- ----------------------------
DROP TABLE IF EXISTS "orgnztn_addr";
CREATE TABLE "orgnztn_addr" (
	"addr_id" int4 NOT NULL,
	"orgnztn_id" int4 NOT NULL,
	"orgnztn_addr_id" int4
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "orgnztn_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "orgnztn_type_cd";
CREATE TABLE "orgnztn_type_cd" (
	"orgnztn_type_cd" char(1) NOT NULL,
	"orgnztn_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "orgnztn_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "orgnztn_type_cd" VALUES ('A', 'APPRAISER');
COMMIT;

-- ----------------------------
--  Table structure for "prprty"
-- ----------------------------
DROP TABLE IF EXISTS "prprty";
CREATE TABLE "prprty" (
	"prprty_id" int4 NOT NULL,
	"non_dwlng_bldng_cnt" int4,
	"prprty_nm" varchar(50),
	"fha_nbr" char(8),
	"sctn_8_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"sctn_236_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"prmr_addr_id" int4 NOT NULL,
	"fmly_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"imax_id" int4,
	"actn_plan_cd" char(1),
	"hud_ownd_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"land_ownrshp_cd" char(1) NOT NULL,
	"land_type_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "prprty"
-- ----------------------------
BEGIN;
INSERT INTO "prprty" VALUES ('1', '1', '3 UNIT LAND', 'N       ', 'N', 'N', '1', 'Y', '1', 'A', 'N', '1', '10');
COMMIT;

-- ----------------------------
--  Table structure for "pblc_and_indn_hsng"
-- ----------------------------
DROP TABLE IF EXISTS "pblc_and_indn_hsng";
CREATE TABLE "pblc_and_indn_hsng" (
	"pih_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "prprty_nm"
-- ----------------------------
DROP TABLE IF EXISTS "prprty_nm";
CREATE TABLE "prprty_nm" (
	"prprty_id" int4 NOT NULL,
	"prprty_nm_sqnc_nbr" char(18) NOT NULL,
	"prprty_altrntv_nm" varchar(40)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "prsn_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "prsn_type_cd";
CREATE TABLE "prsn_type_cd" (
	"prsn_type_cd" char(1) NOT NULL,
	"prsn_type_desc" varchar(50)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "prsn_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "prsn_type_cd" VALUES ('B', 'BORROWER');
INSERT INTO "prsn_type_cd" VALUES ('A', 'APPRAISER');
INSERT INTO "prsn_type_cd" VALUES ('I', 'INSPECTOR');
INSERT INTO "prsn_type_cd" VALUES ('O', 'ORIGINATOR');
COMMIT;

-- ----------------------------
--  Table structure for "race_cd"
-- ----------------------------
DROP TABLE IF EXISTS "race_cd";
CREATE TABLE "race_cd" (
	"race_cd" char(2) NOT NULL,
	"race_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "race_cd"
-- ----------------------------
BEGIN;
INSERT INTO "race_cd" VALUES ('WH', 'WHITE');
INSERT INTO "race_cd" VALUES ('AS', 'ASIAN');
COMMIT;

-- ----------------------------
--  Table structure for "prsn_race"
-- ----------------------------
DROP TABLE IF EXISTS "prsn_race";
CREATE TABLE "prsn_race" (
	"race_cd" char(2) NOT NULL,
	"prsn_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "prsn_race"
-- ----------------------------
BEGIN;
INSERT INTO "prsn_race" VALUES ('AS', '1');
INSERT INTO "prsn_race" VALUES ('WH', '3');
COMMIT;

-- ----------------------------
--  Table structure for "unrdwrtr"
-- ----------------------------
DROP TABLE IF EXISTS "unrdwrtr";
CREATE TABLE "unrdwrtr" (
	"unrdwrtr_fee_chrgd_amt" numeric(10,0),
	"unrdwrtr_frmr_emplyr_id" int8,
	"unrdwrtr_prev_trmntn_dt" date,
	"unrdwrtr_curr_hire_dt" date,
	"unrdwrtr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "vchr"
-- ----------------------------
DROP TABLE IF EXISTS "vchr";
CREATE TABLE "vchr" (
	"vchr_id_d" int4 NOT NULL,
	"vchr_dt" date,
	"clcltd_astnc_pymnt_amt" numeric(19,4),
	"vchr_rprtd_astnc_pymnt_amt" numeric(19,4),
	"husng_astnc_prgm_cd" varchar(2),
	"prj_nbr__" char(11),
	"vchr_actn_efctv_dt" date,
	"vchr_crctn_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"vchr_crctn_rsn_cd" char(1),
	"vchr_admsn_dt" date,
	"vchr_spcl_prgm_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"vchr_othr_spcl_prgm_cd" varchar(5),
	"hshld_sbmsn_sqnc_nbr" int8 NOT NULL,
	"hshld_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "undrwrtng_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "undrwrtng_type_cd";
CREATE TABLE "undrwrtng_type_cd" (
	"undrwrtng_type_cd" varchar(20) NOT NULL,
	"undrwrtng_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "undrwrtng_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "undrwrtng_type_cd" VALUES ('S', 'Desktop Underwriter (DU)');
INSERT INTO "undrwrtng_type_cd" VALUES ('D', 'Direct Guarantee(DG)');
COMMIT;

-- ----------------------------
--  Table structure for "addr_geocd"
-- ----------------------------
DROP TABLE IF EXISTS "addr_geocd";
CREATE TABLE "addr_geocd" (
	"addr_id" int4 NOT NULL,
	"cens_trct_cd" varchar(7) NOT NULL,
	"cens_block_cd" char(18) NOT NULL,
	"msa_cd" char(2) NOT NULL,
	"cbsa_cd" char(5),
	"latd_nbr" char(10),
	"longd_nbr" char(11),
	"geocd_create_tmstp" date,
	"cbsa_metro_nm" varchar(75),
	"cnty_cd" char(3),
	"cbsa_micro_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"cbsa_metro_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"gse_undrsrvd_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"gse_undrsrvd_yr_usd_yr" char(4),
	"cngrsnl_dist_cd" char(2),
	"usps_dpv_vcncy_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"usps_dpv_no_stat_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"addr_rtrn_cd" char(1) NOT NULL,
	"plc_incrprtd_ind" char(1) DEFAULT 'N'::bpchar,
	"new_englnd_city_twn_nm" varchar(75),
	"hud_lclty_cd" varchar(4),
	"usps_dpv_cd" char(1),
	"dpbc_chk_dgt" char(1),
	"addr_type_cd" char(1),
	"address_match_probability_code" char(1),
	"latd_longd_geocd_lvl_rtrn_cd" char(1),
	"addr_geocd_id" int4 NOT NULL,
	"hud_rgn_cd" char(2) NOT NULL,
	"hud_fld_ofc_cd" char(2) NOT NULL,
	"new_englnd_city_twn_area_cd" varchar(5),
	"hoc_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_athrty_de_tier"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_athrty_de_tier";
CREATE TABLE "lndr_athrty_de_tier" (
	"lndr_athrty_cd" char(1) NOT NULL,
	"lndr_id" int4 NOT NULL,
	"de_tier_cd" char(1) NOT NULL,
	"prr_sspnsn_ind" char(1) NOT NULL DEFAULT 'N'::bpchar
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_aprvd_mortg_prgm"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_aprvd_mortg_prgm";
CREATE TABLE "lndr_aprvd_mortg_prgm" (
	"mortg_prgm_id" int4 NOT NULL,
	"lndr_id" int4 NOT NULL,
	"hud_prgm_type_cd" char(4) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "aprvd_bsnss_area"
-- ----------------------------
DROP TABLE IF EXISTS "aprvd_bsnss_area";
CREATE TABLE "aprvd_bsnss_area" (
	"origtn_aprvl_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"undrwrtng_aprvl_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"prfx_cd" char(3) NOT NULL,
	"onap_rgn_cd" char(1) NOT NULL,
	"sec184_aprvd_stat_cd" char(1) NOT NULL,
	"st_cd" char(2),
	"aprvd_bsnss_area_id" int4 NOT NULL,
	"jrsdctn_cd" char(5) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "aprvd_bsnss_area"
-- ----------------------------
BEGIN;
INSERT INTO "aprvd_bsnss_area" VALUES ('Y', 'Y', '211', 'E', 'P', 'AL', '101', '047  ');
COMMIT;

-- ----------------------------
--  Table structure for "strctr_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "strctr_type_cd";
CREATE TABLE "strctr_type_cd" (
	"bldng_strctr_type_cd" char(3) NOT NULL,
	"bldng_strctr_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "strctr_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "strctr_type_cd" VALUES ('NEW', 'New Construction');
INSERT INTO "strctr_type_cd" VALUES ('EXI', 'Existing Construction');
INSERT INTO "strctr_type_cd" VALUES ('REH', 'Rehab');
COMMIT;

-- ----------------------------
--  Table structure for "unit"
-- ----------------------------
DROP TABLE IF EXISTS "unit";
CREATE TABLE "unit" (
	"unit_nbr" char(10) NOT NULL,
	"flr_nbr" varchar(20) NOT NULL,
	"bdrm_cnt" int4 NOT NULL,
	"unit_door_nbr" varchar(20),
	"unit_tag_nbr" varchar(20),
	"acsbl_unit_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"bldng_id" int4,
	"unit_id" int4 NOT NULL,
	"addr_id" int4 NOT NULL,
	"hqs_inspctn_dt" date,
	"unit_build_yr" char(4),
	"entr_cd" char(3)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "doc"
-- ----------------------------
DROP TABLE IF EXISTS "doc";
CREATE TABLE "doc" (
	"doc_id" int4 NOT NULL,
	"doc_mgmt_id" varchar(250),
	"doc_upld_dt" date,
	"doc_create_dt" date,
	"doc_stat_cd" char(1),
	"mail_room_prsn_id" int4,
	"doc_cmpltns_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"rjct_rsn_cd" char(1),
	"doc_type_cd" char(1) NOT NULL,
	"bndr_id" int4,
	"doc_upld_rsn_cd" varchar(250),
	"doc_page_cnt" int4,
	"doc_file_nm_txt" varchar(250),
	"doc_file_link_txt" varchar(250),
	"doc_assmnt_dt" date,
	"lctn_id" int4,
	"doc_upld_msge_txt" varchar(250),
	"send_msge_to_rvw_ind" char(1) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "doc"
-- ----------------------------
BEGIN;
INSERT INTO "doc" VALUES ('301', '56a671c8e1ac4270fd26fc81', '2016-01-25', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('543', '56bd0b8153810250e8c1aaa9', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Penguins.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('545', '56bd0bac53810250e8c1aaad', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'blocker.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('547', '56bd0bde53810250e8c1aaaf', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Lighthouse.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('557', '56bd0e5b53810250e8c1aac3', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Desert.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('451', '56b0ca82e4b0758ccd95a9ea', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'LRSDraftPhasedProjecScope.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('461', '56b11a8de4b0758ccd95a9f4', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('501', '56ba984b6064f3a617db21c8', '2016-02-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('503', '56ba9adc60647dee73b3ed9b', '2016-02-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('507', '56ba9e0860644a61e958a999', '2016-02-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('509', '56baa3ef6064e6d3729a86e1', '2016-02-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('513', '56bb757c007909447ab0b9ce', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Desert.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('516', '56bba603e733437ce6d10d12', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('524', '56bbe913e4b0d80f48a6725e', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('526', '56bbf96ee4b0d80f48a67260', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('561', '56bd0edf53810250e8c1aacc', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Lighthouse.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('197', '569ea0343189d2502f4db12f', '2016-01-19', null, 'A', null, 'N', null, 'd', null, 'R', null, 'level-2-dfd-diagram-example-5416.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('263', '56a10272e4b0d586cbed1025', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Loans Assigned to Each HOC .pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('265', '56a1027ae4b0d586cbed1027', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Loans Assigned to Each HOC .pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('267', '56a10285e4b0d586cbed1029', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'LRSDEMO-Menu.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('404', '56aa5f1ae1ac39e4af4acf8d', '2016-01-28', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('435', '56ab977131895a7ff7b94ada', '2016-01-29', null, 'A', null, 'N', null, 'd', null, 'R', null, 'blocker.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('445', '56b0c2a8e4b0758ccd95a9e6', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'HUD IT Asset Inventory 02282016.xlsx', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('447', '56b0c3f2e4b0758ccd95a9e8', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'LRSDEMO-LD-9 Case review.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('271', '56a135d7e1ace7200484029a', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'LRSDEMO-LD-9 Case review.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('458', '56b0fb27e4b0758ccd95a9f2', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Mortgage Insurance Mind Map.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('511', '56bb7237007909447ab0b9ca', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Penguins.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('518', '56bbb0ede73336bbc1012b20', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('520', '56bbb1f1e7338ec8bab588da', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('531', '56bcbe80e4b0d80f48a67264', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'hud.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('533', '56bcf361e4b0d80f48a67266', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('541', '56bd081c53810250e8c1aaa5', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Penguins.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('549', '56bd0bf253810250e8c1aab3', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Lighthouse.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('551', '56bd0c1453810250e8c1aab7', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Lighthouse.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('601', '56cf49abbba3dd0084e97a33', '2016-02-25', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('641', '56de0284244b5180887d9ecf', '2016-03-07', null, 'A', null, 'N', null, 'd', null, 'R', null, 'blocker.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('661', '56e09854244b7021747a7168', '2016-03-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'ops.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('671', '56e0a206244b7021747a716a', '2016-03-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'blocker.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('193', '569e99cbe1ace06b9d3f4e19', '2016-01-19', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('199', '569ea0613189d2502f4db131', '2016-01-19', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Desert.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('201', '569ea9d7e1ac97e58d6bca1b', '2016-01-19', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('221', '569fa5cce4b0c074182b5e61', '2016-01-20', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Lancia Stratos.png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('241', '56a023ece4b0d586cbed1021', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Shuttle.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('303', '56a673c1e1ac4270fd26fc83', '2016-01-25', null, 'A', null, 'N', null, 'd', null, 'R', null, 'gitignore_global.txt', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('305', '56a67436e1ac4270fd26fc85', '2016-01-25', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('369', '56a8e731e4b0eb3d12fe31b1', '2016-01-27', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('505', '56ba9ce36064391651e9bdcc', '2016-02-09', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('522', '56bbe3f889eb85ebefab18f3', '2016-02-10', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('529', '56bbfcaee4b0d80f48a67262', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Screenshot (1).png', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('553', '56bd0c8853810250e8c1aabb', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Penguins.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('555', '56bd0cb053810250e8c1aabf', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Tulips.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('559', '56bd0e8b53810250e8c1aac8', '2016-02-11', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Penguins.jpg', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('453', '56b0cbe1e4b0758ccd95a9ec', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'How to get the best out of your ALM tool.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('261', '56a10262e4b0d586cbed1023', '2016-01-21', null, 'A', null, 'N', null, 'd', null, 'R', null, 'HUD  CaReS additional Items  for SLAP .docx', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('455', '56b0da8de4b0758ccd95a9ee', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'HUD_Mortgage_Insurance_LoS_Diagram_39803.pdf', null, null, null, null, 'Y');
INSERT INTO "doc" VALUES ('443', '56b0c225e4b0758ccd95a9e3', '2016-02-02', null, 'A', null, 'N', null, 'd', null, 'R', null, 'Federal Agency Preliminary Information Technology Asset Inventory.pdf', null, null, null, null, 'Y');
COMMIT;

-- ----------------------------
--  Table structure for "doc_stat_cd"
-- ----------------------------
DROP TABLE IF EXISTS "doc_stat_cd";
CREATE TABLE "doc_stat_cd" (
	"doc_stat_cd" char(1) NOT NULL,
	"doc_stat_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "doc_stat_cd"
-- ----------------------------
BEGIN;
INSERT INTO "doc_stat_cd" VALUES ('A', 'ACCEPTED');
INSERT INTO "doc_stat_cd" VALUES ('N', 'NEW');
INSERT INTO "doc_stat_cd" VALUES ('R', 'REVIEWED');
COMMIT;

-- ----------------------------
--  Table structure for "doc_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "doc_type_cd";
CREATE TABLE "doc_type_cd" (
	"doc_type_cd" char(1) NOT NULL,
	"doc_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "doc_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "doc_type_cd" VALUES ('d', 'Document');
COMMIT;

-- ----------------------------
--  Table structure for "rjct_rsn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "rjct_rsn_cd";
CREATE TABLE "rjct_rsn_cd" (
	"rjct_rsn_cd" char(1) NOT NULL,
	"rjct_rsn_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_addr"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_addr";
CREATE TABLE "lndr_addr" (
	"addr_id" int4 NOT NULL,
	"lndr_addr_type_cd" char(1) NOT NULL,
	"lndr_pnt_of_cntct_id" int4,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_brnch"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_brnch";
CREATE TABLE "lndr_brnch" (
	"fha_rqrmnt_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"brnch_nm" varchar(40),
	"main_ofc_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"brnch_fha_rqrmnt_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"actv_brnch_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"brnch_stat_cd" char(1) NOT NULL,
	"brnch_type_cd" char(1) NOT NULL,
	"nmls_id" int4,
	"cr_wtch_trmntn_dt" date,
	"brnch_nbr" int8 NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "lndr_brnch"
-- ----------------------------
BEGIN;
INSERT INTO "lndr_brnch" VALUES ('Y', 'Main Branch', 'Y', 'Y', 'Y', 'A', 'M', null, null, '10', '1001');
COMMIT;

-- ----------------------------
--  Table structure for "lndr_ctgry_cd"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_ctgry_cd";
CREATE TABLE "lndr_ctgry_cd" (
	"lndr_ctgry_cd" char(1) NOT NULL,
	"lndr_ctgry_desc" varchar(40)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "lndr_ctgry_cd"
-- ----------------------------
BEGIN;
INSERT INTO "lndr_ctgry_cd" VALUES ('S', 'Supervised');
INSERT INTO "lndr_ctgry_cd" VALUES ('N', 'Non-Supervised');
INSERT INTO "lndr_ctgry_cd" VALUES ('G', 'Government');
INSERT INTO "lndr_ctgry_cd" VALUES ('I', 'Investing');
COMMIT;

-- ----------------------------
--  Table structure for "lndr_fnctn"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_fnctn";
CREATE TABLE "lndr_fnctn" (
	"lndr_fnctn_cd" char(1) NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "loan_borrwr"
-- ----------------------------
DROP TABLE IF EXISTS "loan_borrwr";
CREATE TABLE "loan_borrwr" (
	"borrwr_id" int4 NOT NULL,
	"addr_id" int4 NOT NULL,
	"addr_vldtn_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"prmr_borrwr_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"loan_id" int4 NOT NULL,
	"borrwr_type_cd" char(18) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_borrwr"
-- ----------------------------
BEGIN;
INSERT INTO "loan_borrwr" VALUES ('1', '1', 'N', 'Y', '1', '1                 ');
INSERT INTO "loan_borrwr" VALUES ('2', '1', 'N', 'Y', '2', '1                 ');
INSERT INTO "loan_borrwr" VALUES ('3', '1', 'N', 'N', '3', '2                 ');
INSERT INTO "loan_borrwr" VALUES ('4', '1', 'N', 'N', '4', '2                 ');
COMMIT;

-- ----------------------------
--  Table structure for "loan_ofcr"
-- ----------------------------
DROP TABLE IF EXISTS "loan_ofcr";
CREATE TABLE "loan_ofcr" (
	"loan_ofcr_id" int4 NOT NULL,
	"nmls_id" int4,
	"brnch_nbr" int8 NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_ofcr"
-- ----------------------------
BEGIN;
INSERT INTO "loan_ofcr" VALUES ('9001', '1', '10', '1001');
COMMIT;

-- ----------------------------
--  Table structure for "loan_rsn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "loan_rsn_cd";
CREATE TABLE "loan_rsn_cd" (
	"loan_rsn_cd" varchar(20) NOT NULL,
	"loan_rsn_descriptio" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "loan_term_cd"
-- ----------------------------
DROP TABLE IF EXISTS "loan_term_cd";
CREATE TABLE "loan_term_cd" (
	"loan_term_cd" char(1) NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "lndr_brnch_addr"
-- ----------------------------
DROP TABLE IF EXISTS "lndr_brnch_addr";
CREATE TABLE "lndr_brnch_addr" (
	"lndr_addr_type_cd" char(1) NOT NULL,
	"addr_id" int4 NOT NULL,
	"brnch_nbr" int8 NOT NULL,
	"lndr_id" int4 NOT NULL,
	"lndr_brnch_cntct_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Table structure for "sbsdy_mntnnc"
-- ----------------------------
DROP TABLE IF EXISTS "sbsdy_mntnnc";
CREATE TABLE "sbsdy_mntnnc" (
	"sbsdy_id" int4 NOT NULL,
	"strt_dt" date,
	"end_dt" date,
	"upfrnt_fee_rate" numeric(5,4),
	"anul_fee_rate" numeric(5,4),
	"sbsdy_rate" numeric(5,4),
	"chrt_yr" int4
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "sbsdy_mntnnc"
-- ----------------------------
BEGIN;
INSERT INTO "sbsdy_mntnnc" VALUES ('25', '2015-10-01', '2016-09-30', '0.0150', '0.0015', '0.0063', '2016');
INSERT INTO "sbsdy_mntnnc" VALUES ('24', '2014-11-15', '2020-12-31', '0.0150', '0.0015', '0.0084', '2015');
INSERT INTO "sbsdy_mntnnc" VALUES ('23', '2014-04-03', '2014-09-30', '0.0150', '0.0000', '0.0033', '2014');
INSERT INTO "sbsdy_mntnnc" VALUES ('22', '2014-10-01', '2014-11-14', '0.0150', '0.0000', '0.0228', '2015');
INSERT INTO "sbsdy_mntnnc" VALUES ('21', '2013-10-01', '2014-04-02', '0.0100', '0.0000', '0.0083', '2014');
INSERT INTO "sbsdy_mntnnc" VALUES ('20', '2012-10-01', '2013-09-30', '0.0100', '0.0000', '0.0135', '2013');
COMMIT;

-- ----------------------------
--  Table structure for "trbl_afltn"
-- ----------------------------
DROP TABLE IF EXISTS "trbl_afltn";
CREATE TABLE "trbl_afltn" (
	"trbl_afltn_cd" varchar(4) NOT NULL,
	"trbl_afltn_nm" varchar(40)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "trbl_afltn"
-- ----------------------------
BEGIN;
INSERT INTO "trbl_afltn" VALUES ('CHRK', 'Cherokee');
INSERT INTO "trbl_afltn" VALUES ('CHKA', 'Chickasaw');
COMMIT;

-- ----------------------------
--  Table structure for "borrwr"
-- ----------------------------
DROP TABLE IF EXISTS "borrwr";
CREATE TABLE "borrwr" (
	"borrwr_id" int4 NOT NULL,
	"dpndnt_cnt" int4,
	"self_emplyd_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"rntng_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"frst_time_home_byr_ind" char(1) NOT NULL DEFAULT 'N'::bpchar,
	"exprn_fico_nbr" int4,
	"eqfx_bcn_cr_nbr" int4,
	"trnsnn_emprc_cr_nbr" int4,
	"rntng_yr_cnt" int4,
	"trbl_afltn_cd" varchar(4)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "borrwr"
-- ----------------------------
BEGIN;
INSERT INTO "borrwr" VALUES ('4', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('1', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('5', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('6', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('7', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('8', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('2', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
INSERT INTO "borrwr" VALUES ('3', '2', 'N', 'N', 'Y', '600', '610', '620', '1', 'CHRK');
COMMIT;

-- ----------------------------
--  Table structure for "doc_upld_rsn_cd"
-- ----------------------------
DROP TABLE IF EXISTS "doc_upld_rsn_cd";
CREATE TABLE "doc_upld_rsn_cd" (
	"doc_upld_rsn_cd" char(1) NOT NULL,
	"doc_upld_rsn_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "doc_upld_rsn_cd"
-- ----------------------------
BEGIN;
INSERT INTO "doc_upld_rsn_cd" VALUES ('R', 'Initial Upload');
INSERT INTO "doc_upld_rsn_cd" VALUES ('A', 'Upload to Document Request');
COMMIT;

-- ----------------------------
--  Table structure for "loan_type_cd"
-- ----------------------------
DROP TABLE IF EXISTS "loan_type_cd";
CREATE TABLE "loan_type_cd" (
	"loan_type_cd" char(1) NOT NULL,
	"loan_type_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_type_cd"
-- ----------------------------
BEGIN;
INSERT INTO "loan_type_cd" VALUES ('R', 'Refi');
INSERT INTO "loan_type_cd" VALUES ('S', 'Purchase');
INSERT INTO "loan_type_cd" VALUES ('N', 'Construction');
INSERT INTO "loan_type_cd" VALUES ('H', 'HECM');
INSERT INTO "loan_type_cd" VALUES ('K', '203K');
COMMIT;

-- ----------------------------
--  Table structure for "inspctr"
-- ----------------------------
DROP TABLE IF EXISTS "inspctr";
CREATE TABLE "inspctr" (
	"inspctr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "inspctr"
-- ----------------------------
BEGIN;
INSERT INTO "inspctr" VALUES ('4001');
INSERT INTO "inspctr" VALUES ('4002');
COMMIT;

-- ----------------------------
--  Table structure for "loan_orgntr"
-- ----------------------------
DROP TABLE IF EXISTS "loan_orgntr";
CREATE TABLE "loan_orgntr" (
	"loan_orgntr_id" int4 NOT NULL,
	"brnch_nbr" int8 NOT NULL,
	"lndr_id" int4 NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_orgntr"
-- ----------------------------
BEGIN;
INSERT INTO "loan_orgntr" VALUES ('10', '10', '1001');
COMMIT;

-- ----------------------------
--  Table structure for "loan_prps_cd"
-- ----------------------------
DROP TABLE IF EXISTS "loan_prps_cd";
CREATE TABLE "loan_prps_cd" (
	"loan_prps_cd" char(4) NOT NULL,
	"loan_prps_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "loan_prps_cd"
-- ----------------------------
BEGIN;
INSERT INTO "loan_prps_cd" VALUES ('EXIS', 'Acquisition of Existing Home');
INSERT INTO "loan_prps_cd" VALUES ('RHAB', 'Rehab of Existing Home');
INSERT INTO "loan_prps_cd" VALUES ('REFI', 'Refinance');
INSERT INTO "loan_prps_cd" VALUES ('EXRH', 'Acquisition and Rehab of Existing Home');
COMMIT;

-- ----------------------------
--  Table structure for "mrtl_stat_cd"
-- ----------------------------
DROP TABLE IF EXISTS "mrtl_stat_cd";
CREATE TABLE "mrtl_stat_cd" (
	"mrtl_stat_cd" char(1) NOT NULL,
	"mrtl_stat_desc" varchar(250)
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Records of "mrtl_stat_cd"
-- ----------------------------
BEGIN;
INSERT INTO "mrtl_stat_cd" VALUES ('M', 'Married');
INSERT INTO "mrtl_stat_cd" VALUES ('S', 'Single');
INSERT INTO "mrtl_stat_cd" VALUES ('D', 'Divorced');
INSERT INTO "mrtl_stat_cd" VALUES ('W', 'Widowed');
COMMIT;

-- ----------------------------
--  Primary key structure for table "sec184_aprvd_stat_cd"
-- ----------------------------
ALTER TABLE "sec184_aprvd_stat_cd" ADD CONSTRAINT "xpksec184_aprvd_stat_cd" PRIMARY KEY ("sec184_aprvd_stat_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "addr"
-- ----------------------------
ALTER TABLE "addr" ADD CONSTRAINT "xpkaddr" PRIMARY KEY ("addr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "addr_type_cd"
-- ----------------------------
ALTER TABLE "addr_type_cd" ADD CONSTRAINT "xpkaddr_type_cd" PRIMARY KEY ("addr_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "amrtztn_cd"
-- ----------------------------
ALTER TABLE "amrtztn_cd" ADD CONSTRAINT "xpkamrtztn_cd" PRIMARY KEY ("amrtztn_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "aprsl_firm"
-- ----------------------------
ALTER TABLE "aprsl_firm" ADD CONSTRAINT "xpkaprsl_firm" PRIMARY KEY ("aprsl_firm_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "aprsr"
-- ----------------------------
ALTER TABLE "aprsr" ADD CONSTRAINT "xpkaprsr" PRIMARY KEY ("aprsr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "aprsr_lic_type_cd"
-- ----------------------------
ALTER TABLE "aprsr_lic_type_cd" ADD CONSTRAINT "xpkaprsr_lic_type_cd" PRIMARY KEY ("aprsr_lic_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "aprsr_st_lic"
-- ----------------------------
ALTER TABLE "aprsr_st_lic" ADD CONSTRAINT "xpkaprsr_st_lic" PRIMARY KEY ("st_cd", "aprsr_id", "aprsr_lic_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "bndr"
-- ----------------------------
ALTER TABLE "bndr" ADD CONSTRAINT "xpkbndr" PRIMARY KEY ("bndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "borrwr_type_cd"
-- ----------------------------
ALTER TABLE "borrwr_type_cd" ADD CONSTRAINT "xpkborrwr_type_cd" PRIMARY KEY ("borrwr_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "brnch_stat_cd"
-- ----------------------------
ALTER TABLE "brnch_stat_cd" ADD CONSTRAINT "xpkbrnch_stat_cd" PRIMARY KEY ("brnch_stat_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "brnch_type_cd"
-- ----------------------------
ALTER TABLE "brnch_type_cd" ADD CONSTRAINT "xpkbrnch_type_cd" PRIMARY KEY ("brnch_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "case_stat_cd"
-- ----------------------------
ALTER TABLE "case_stat_cd" ADD CONSTRAINT "xpkcase_stat_cd" PRIMARY KEY ("case_stat_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "cnty_cd"
-- ----------------------------
ALTER TABLE "cnty_cd" ADD CONSTRAINT "xpkcnty_cd" PRIMARY KEY ("cnty_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "undrwrtng_rprt"
-- ----------------------------
ALTER TABLE "undrwrtng_rprt" ADD CONSTRAINT "xpkundrwrtng_rprt" PRIMARY KEY ("undrwrtng_rprt_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "ethnct_cd"
-- ----------------------------
ALTER TABLE "ethnct_cd" ADD CONSTRAINT "xpkethnct_cd" PRIMARY KEY ("ethnct_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "gndr_cd"
-- ----------------------------
ALTER TABLE "gndr_cd" ADD CONSTRAINT "xpkgndr_cd" PRIMARY KEY ("gndr_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "hud_orgnztn"
-- ----------------------------
ALTER TABLE "hud_orgnztn" ADD CONSTRAINT "xpkhud_orgnztn" PRIMARY KEY ("hud_orgnztn_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "hud_prgm"
-- ----------------------------
ALTER TABLE "hud_prgm" ADD CONSTRAINT "xpkhud_prgm" PRIMARY KEY ("hud_prgm_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "hud_rgn_cd"
-- ----------------------------
ALTER TABLE "hud_rgn_cd" ADD CONSTRAINT "xpkhud_rgn_cd" PRIMARY KEY ("hud_rgn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "land_ownrshp_cd"
-- ----------------------------
ALTER TABLE "land_ownrshp_cd" ADD CONSTRAINT "xpkland_ownrshp_cd" PRIMARY KEY ("land_ownrshp_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "land_type_cd"
-- ----------------------------
ALTER TABLE "land_type_cd" ADD CONSTRAINT "xpkland_type_cd" PRIMARY KEY ("land_type_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr"
-- ----------------------------
ALTER TABLE "lndr" ADD CONSTRAINT "xpklndr" PRIMARY KEY ("lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_addr_type_cd"
-- ----------------------------
ALTER TABLE "lndr_addr_type_cd" ADD CONSTRAINT "xpklndr_addr_type_cd" PRIMARY KEY ("lndr_addr_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_athrty"
-- ----------------------------
ALTER TABLE "lndr_athrty" ADD CONSTRAINT "xpklndr_athrty" PRIMARY KEY ("lndr_athrty_cd", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_athrty_cd"
-- ----------------------------
ALTER TABLE "lndr_athrty_cd" ADD CONSTRAINT "xpklndr_athrty_cd" PRIMARY KEY ("lndr_athrty_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_rcrtfctn"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn" ADD CONSTRAINT "xpklndr_rcrtfctn" PRIMARY KEY ("rcrtfctn_id", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_rcrtfctn_dfcncy"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn_dfcncy" ADD CONSTRAINT "xpklndr_rcrtfctn_dfcncy" PRIMARY KEY ("dfcncy_id", "rcrtfctn_id", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_rcrtfctn_step"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn_step" ADD CONSTRAINT "xpklndr_rcrtfctn_step" PRIMARY KEY ("rcrtfctn_step_nbr", "rcrtfctn_id", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan"
-- ----------------------------
ALTER TABLE "loan" ADD CONSTRAINT "xpkloan" PRIMARY KEY ("loan_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_mortg"
-- ----------------------------
ALTER TABLE "loan_mortg" ADD CONSTRAINT "xpkloan_mortg" PRIMARY KEY ("loan_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_fnds_to_cls"
-- ----------------------------
ALTER TABLE "loan_fnds_to_cls" ADD CONSTRAINT "xpkloan_fnds_to_cls" PRIMARY KEY ("loan_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "prsn"
-- ----------------------------
ALTER TABLE "prsn" ADD CONSTRAINT "xpkprsn" PRIMARY KEY ("prsn_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "onap"
-- ----------------------------
ALTER TABLE "onap" ADD CONSTRAINT "xpkonap" PRIMARY KEY ("onap_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "onap_rgn_cd"
-- ----------------------------
ALTER TABLE "onap_rgn_cd" ADD CONSTRAINT "xpkonap_rgn_cd" PRIMARY KEY ("onap_rgn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "orgnztn"
-- ----------------------------
ALTER TABLE "orgnztn" ADD CONSTRAINT "xpkorgnztn" PRIMARY KEY ("orgnztn_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "orgnztn_addr"
-- ----------------------------
ALTER TABLE "orgnztn_addr" ADD CONSTRAINT "xpkorgnztn_addr" PRIMARY KEY ("addr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "orgnztn_type_cd"
-- ----------------------------
ALTER TABLE "orgnztn_type_cd" ADD CONSTRAINT "xpkorgnztn_type_cd" PRIMARY KEY ("orgnztn_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "prprty"
-- ----------------------------
ALTER TABLE "prprty" ADD CONSTRAINT "xpkprprty" PRIMARY KEY ("prprty_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "pblc_and_indn_hsng"
-- ----------------------------
ALTER TABLE "pblc_and_indn_hsng" ADD CONSTRAINT "xpkpblc_and_indn_hsng" PRIMARY KEY ("pih_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "prprty_nm"
-- ----------------------------
ALTER TABLE "prprty_nm" ADD CONSTRAINT "xpkprprty_nm" PRIMARY KEY ("prprty_id", "prprty_nm_sqnc_nbr") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "prsn_type_cd"
-- ----------------------------
ALTER TABLE "prsn_type_cd" ADD CONSTRAINT "xpkprsn_type_cd" PRIMARY KEY ("prsn_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "race_cd"
-- ----------------------------
ALTER TABLE "race_cd" ADD CONSTRAINT "xpkrace_cd" PRIMARY KEY ("race_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "prsn_race"
-- ----------------------------
ALTER TABLE "prsn_race" ADD CONSTRAINT "xpkprsn_race" PRIMARY KEY ("prsn_id", "race_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "unrdwrtr"
-- ----------------------------
ALTER TABLE "unrdwrtr" ADD CONSTRAINT "xpkunrdwrtr" PRIMARY KEY ("unrdwrtr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "vchr"
-- ----------------------------
ALTER TABLE "vchr" ADD CONSTRAINT "xpkvchr" PRIMARY KEY ("vchr_id_d") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "undrwrtng_type_cd"
-- ----------------------------
ALTER TABLE "undrwrtng_type_cd" ADD CONSTRAINT "xpkundrwrtng_type_cd" PRIMARY KEY ("undrwrtng_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "addr_geocd"
-- ----------------------------
ALTER TABLE "addr_geocd" ADD CONSTRAINT "xpkaddr_geocd" PRIMARY KEY ("addr_geocd_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_athrty_de_tier"
-- ----------------------------
ALTER TABLE "lndr_athrty_de_tier" ADD CONSTRAINT "xpklndr_athrty_de_tier" PRIMARY KEY ("lndr_athrty_cd", "lndr_id", "de_tier_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_aprvd_mortg_prgm"
-- ----------------------------
ALTER TABLE "lndr_aprvd_mortg_prgm" ADD CONSTRAINT "xpklndr_aprvd_mortg_prgm" PRIMARY KEY ("mortg_prgm_id", "lndr_id", "hud_prgm_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "aprvd_bsnss_area"
-- ----------------------------
ALTER TABLE "aprvd_bsnss_area" ADD CONSTRAINT "xpkaprvd_bsnss_area" PRIMARY KEY ("aprvd_bsnss_area_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "strctr_type_cd"
-- ----------------------------
ALTER TABLE "strctr_type_cd" ADD CONSTRAINT "xpkstrctr_type_cd" PRIMARY KEY ("bldng_strctr_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "unit"
-- ----------------------------
ALTER TABLE "unit" ADD CONSTRAINT "sys_c0032452" PRIMARY KEY ("unit_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "doc"
-- ----------------------------
ALTER TABLE "doc" ADD CONSTRAINT "xpkdoc" PRIMARY KEY ("doc_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "doc_stat_cd"
-- ----------------------------
ALTER TABLE "doc_stat_cd" ADD CONSTRAINT "xpkdoc_stat_cd" PRIMARY KEY ("doc_stat_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "doc_type_cd"
-- ----------------------------
ALTER TABLE "doc_type_cd" ADD CONSTRAINT "xpkdoc_type_cd" PRIMARY KEY ("doc_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "rjct_rsn_cd"
-- ----------------------------
ALTER TABLE "rjct_rsn_cd" ADD CONSTRAINT "xpkrjct_rsn_cd" PRIMARY KEY ("rjct_rsn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_addr"
-- ----------------------------
ALTER TABLE "lndr_addr" ADD CONSTRAINT "xpklndr_addr" PRIMARY KEY ("addr_id", "lndr_addr_type_cd", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_brnch"
-- ----------------------------
ALTER TABLE "lndr_brnch" ADD CONSTRAINT "xpklndr_brnch" PRIMARY KEY ("brnch_nbr", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_ctgry_cd"
-- ----------------------------
ALTER TABLE "lndr_ctgry_cd" ADD CONSTRAINT "xpklndr_ctgry_cd" PRIMARY KEY ("lndr_ctgry_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_fnctn"
-- ----------------------------
ALTER TABLE "lndr_fnctn" ADD CONSTRAINT "xpklndr_fnctn" PRIMARY KEY ("lndr_fnctn_cd", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_borrwr"
-- ----------------------------
ALTER TABLE "loan_borrwr" ADD CONSTRAINT "xpkloan_borrwr" PRIMARY KEY ("borrwr_id", "loan_id", "borrwr_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_ofcr"
-- ----------------------------
ALTER TABLE "loan_ofcr" ADD CONSTRAINT "xpkloan_ofcr" PRIMARY KEY ("loan_ofcr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_rsn_cd"
-- ----------------------------
ALTER TABLE "loan_rsn_cd" ADD CONSTRAINT "xpkloan_rsn_cd" PRIMARY KEY ("loan_rsn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_term_cd"
-- ----------------------------
ALTER TABLE "loan_term_cd" ADD CONSTRAINT "xpkloan_term_cd" PRIMARY KEY ("loan_term_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "lndr_brnch_addr"
-- ----------------------------
ALTER TABLE "lndr_brnch_addr" ADD CONSTRAINT "xpklndr_brnch_addr" PRIMARY KEY ("lndr_addr_type_cd", "addr_id", "brnch_nbr", "lndr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "sbsdy_mntnnc"
-- ----------------------------
ALTER TABLE "sbsdy_mntnnc" ADD CONSTRAINT "xpksbsdy_mntnnc" PRIMARY KEY ("sbsdy_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "trbl_afltn"
-- ----------------------------
ALTER TABLE "trbl_afltn" ADD CONSTRAINT "xpktrbl_afltn" PRIMARY KEY ("trbl_afltn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "borrwr"
-- ----------------------------
ALTER TABLE "borrwr" ADD CONSTRAINT "xpkborrwr" PRIMARY KEY ("borrwr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "doc_upld_rsn_cd"
-- ----------------------------
ALTER TABLE "doc_upld_rsn_cd" ADD CONSTRAINT "xpkdoc_upld_rsn_cd" PRIMARY KEY ("doc_upld_rsn_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_type_cd"
-- ----------------------------
ALTER TABLE "loan_type_cd" ADD CONSTRAINT "xpkloan_type_cd" PRIMARY KEY ("loan_type_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "inspctr"
-- ----------------------------
ALTER TABLE "inspctr" ADD CONSTRAINT "xpkinspctr" PRIMARY KEY ("inspctr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_orgntr"
-- ----------------------------
ALTER TABLE "loan_orgntr" ADD CONSTRAINT "xpkloan_orgntr" PRIMARY KEY ("loan_orgntr_id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "loan_prps_cd"
-- ----------------------------
ALTER TABLE "loan_prps_cd" ADD CONSTRAINT "xpkloan_prps_cd" PRIMARY KEY ("loan_prps_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table "mrtl_stat_cd"
-- ----------------------------
ALTER TABLE "mrtl_stat_cd" ADD CONSTRAINT "xpkmrtl_stat_cd" PRIMARY KEY ("mrtl_stat_cd") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "aprsr"
-- ----------------------------
ALTER TABLE "aprsr" ADD CONSTRAINT "r_20" FOREIGN KEY ("orgnztn_id") REFERENCES "orgnztn" ("orgnztn_id") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "aprsr" ADD CONSTRAINT "r_714" FOREIGN KEY ("aprsl_firm_id") REFERENCES "aprsl_firm" ("aprsl_firm_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "aprsr_st_lic"
-- ----------------------------
ALTER TABLE "aprsr_st_lic" ADD CONSTRAINT "r_12" FOREIGN KEY ("aprsr_lic_type_cd") REFERENCES "aprsr_lic_type_cd" ("aprsr_lic_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "aprsr_st_lic" ADD CONSTRAINT "r_15" FOREIGN KEY ("aprsr_id") REFERENCES "aprsr" ("aprsr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "bndr"
-- ----------------------------
ALTER TABLE "bndr" ADD CONSTRAINT "r_562" FOREIGN KEY ("loan_id") REFERENCES "loan" ("loan_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "undrwrtng_rprt"
-- ----------------------------
ALTER TABLE "undrwrtng_rprt" ADD CONSTRAINT "r_550" FOREIGN KEY ("undrwrtng_rprt_id") REFERENCES "doc" ("doc_id") ON UPDATE NO ACTION ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "hud_orgnztn"
-- ----------------------------
ALTER TABLE "hud_orgnztn" ADD CONSTRAINT "r_476" FOREIGN KEY ("hud_orgnztn_id") REFERENCES "orgnztn" ("orgnztn_id") ON UPDATE NO ACTION ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_athrty"
-- ----------------------------
ALTER TABLE "lndr_athrty" ADD CONSTRAINT "r_456" FOREIGN KEY ("lndr_athrty_cd") REFERENCES "lndr_athrty_cd" ("lndr_athrty_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_athrty" ADD CONSTRAINT "r_410" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_rcrtfctn"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn" ADD CONSTRAINT "r_411" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_rcrtfctn_dfcncy"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn_dfcncy" ADD CONSTRAINT "r_423" FOREIGN KEY ("rcrtfctn_id", "lndr_id") REFERENCES "lndr_rcrtfctn" ("rcrtfctn_id", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_rcrtfctn_step"
-- ----------------------------
ALTER TABLE "lndr_rcrtfctn_step" ADD CONSTRAINT "r_453" FOREIGN KEY ("rcrtfctn_id", "lndr_id") REFERENCES "lndr_rcrtfctn" ("rcrtfctn_id", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan"
-- ----------------------------
ALTER TABLE "loan" ADD CONSTRAINT "r_491" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "loan" ADD CONSTRAINT "r_609" FOREIGN KEY ("aprsr_id") REFERENCES "aprsr" ("aprsr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "loan" ADD CONSTRAINT "r_700" FOREIGN KEY ("case_stat_cd") REFERENCES "case_stat_cd" ("case_stat_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "loan" ADD CONSTRAINT "r_701" FOREIGN KEY ("undrwrtng_type_cd") REFERENCES "undrwrtng_type_cd" ("undrwrtng_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "loan" ADD CONSTRAINT "r_514" FOREIGN KEY ("inspctr_id") REFERENCES "inspctr" ("inspctr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "loan" ADD CONSTRAINT "r_722" FOREIGN KEY ("loan_prps_cd") REFERENCES "loan_prps_cd" ("loan_prps_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan_mortg"
-- ----------------------------
ALTER TABLE "loan_mortg" ADD CONSTRAINT "r_712" FOREIGN KEY ("loan_id") REFERENCES "loan" ("loan_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan_fnds_to_cls"
-- ----------------------------
ALTER TABLE "loan_fnds_to_cls" ADD CONSTRAINT "r_713" FOREIGN KEY ("loan_id") REFERENCES "loan" ("loan_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "prsn"
-- ----------------------------
ALTER TABLE "prsn" ADD CONSTRAINT "r_35" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prsn" ADD CONSTRAINT "r_42" FOREIGN KEY ("prsn_type_cd") REFERENCES "prsn_type_cd" ("prsn_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prsn" ADD CONSTRAINT "r_109" FOREIGN KEY ("gndr_cd") REFERENCES "gndr_cd" ("gndr_cd") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prsn" ADD CONSTRAINT "r_110" FOREIGN KEY ("ethncty_cd") REFERENCES "ethnct_cd" ("ethnct_cd") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prsn" ADD CONSTRAINT "r_723" FOREIGN KEY ("mrtl_stat_cd") REFERENCES "mrtl_stat_cd" ("mrtl_stat_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "onap"
-- ----------------------------
ALTER TABLE "onap" ADD CONSTRAINT "r_493" FOREIGN KEY ("pih_id") REFERENCES "pblc_and_indn_hsng" ("pih_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "orgnztn"
-- ----------------------------
ALTER TABLE "orgnztn" ADD CONSTRAINT "r_143" FOREIGN KEY ("orgnztn_type_cd") REFERENCES "orgnztn_type_cd" ("orgnztn_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "orgnztn_addr"
-- ----------------------------
ALTER TABLE "orgnztn_addr" ADD CONSTRAINT "r_692" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "orgnztn_addr" ADD CONSTRAINT "r_693" FOREIGN KEY ("orgnztn_id") REFERENCES "orgnztn" ("orgnztn_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "prprty"
-- ----------------------------
ALTER TABLE "prprty" ADD CONSTRAINT "r_699" FOREIGN KEY ("land_ownrshp_cd") REFERENCES "land_ownrshp_cd" ("land_ownrshp_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prprty" ADD CONSTRAINT "r_704" FOREIGN KEY ("land_type_id") REFERENCES "land_type_cd" ("land_type_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "pblc_and_indn_hsng"
-- ----------------------------
ALTER TABLE "pblc_and_indn_hsng" ADD CONSTRAINT "r_481" FOREIGN KEY ("pih_id") REFERENCES "hud_orgnztn" ("hud_orgnztn_id") ON UPDATE NO ACTION ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "prprty_nm"
-- ----------------------------
ALTER TABLE "prprty_nm" ADD CONSTRAINT "r_239" FOREIGN KEY ("prprty_id") REFERENCES "prprty" ("prprty_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "prsn_race"
-- ----------------------------
ALTER TABLE "prsn_race" ADD CONSTRAINT "r_14" FOREIGN KEY ("prsn_id") REFERENCES "prsn" ("prsn_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "prsn_race" ADD CONSTRAINT "r_40" FOREIGN KEY ("race_cd") REFERENCES "race_cd" ("race_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "addr_geocd"
-- ----------------------------
ALTER TABLE "addr_geocd" ADD CONSTRAINT "r_262" FOREIGN KEY ("cnty_cd") REFERENCES "cnty_cd" ("cnty_cd") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "addr_geocd" ADD CONSTRAINT "r_264" FOREIGN KEY ("addr_type_cd") REFERENCES "addr_type_cd" ("addr_type_cd") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "addr_geocd" ADD CONSTRAINT "r_267" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "addr_geocd" ADD CONSTRAINT "r_470" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_athrty_de_tier"
-- ----------------------------
ALTER TABLE "lndr_athrty_de_tier" ADD CONSTRAINT "r_580" FOREIGN KEY ("lndr_athrty_cd", "lndr_id") REFERENCES "lndr_athrty" ("lndr_athrty_cd", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_aprvd_mortg_prgm"
-- ----------------------------
ALTER TABLE "lndr_aprvd_mortg_prgm" ADD CONSTRAINT "r_467" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "aprvd_bsnss_area"
-- ----------------------------
ALTER TABLE "aprvd_bsnss_area" ADD CONSTRAINT "r_478" FOREIGN KEY ("sec184_aprvd_stat_cd") REFERENCES "sec184_aprvd_stat_cd" ("sec184_aprvd_stat_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "aprvd_bsnss_area" ADD CONSTRAINT "r_474" FOREIGN KEY ("onap_rgn_cd") REFERENCES "onap_rgn_cd" ("onap_rgn_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "unit"
-- ----------------------------
ALTER TABLE "unit" ADD CONSTRAINT "r_17" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "doc"
-- ----------------------------
ALTER TABLE "doc" ADD CONSTRAINT "r_644" FOREIGN KEY ("bndr_id") REFERENCES "bndr" ("bndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "doc" ADD CONSTRAINT "r_504" FOREIGN KEY ("doc_stat_cd") REFERENCES "doc_stat_cd" ("doc_stat_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "doc" ADD CONSTRAINT "r_513" FOREIGN KEY ("rjct_rsn_cd") REFERENCES "rjct_rsn_cd" ("rjct_rsn_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "doc" ADD CONSTRAINT "r_549" FOREIGN KEY ("doc_type_cd") REFERENCES "doc_type_cd" ("doc_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "doc" ADD CONSTRAINT "r_718" FOREIGN KEY ("doc_upld_rsn_cd") REFERENCES "doc_upld_rsn_cd" ("doc_upld_rsn_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_addr"
-- ----------------------------
ALTER TABLE "lndr_addr" ADD CONSTRAINT "r_281" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_addr" ADD CONSTRAINT "r_282" FOREIGN KEY ("lndr_addr_type_cd") REFERENCES "lndr_addr_type_cd" ("lndr_addr_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_addr" ADD CONSTRAINT "r_280" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_addr" ADD CONSTRAINT "r_300" FOREIGN KEY ("lndr_pnt_of_cntct_id") REFERENCES "prsn" ("prsn_id") ON UPDATE NO ACTION ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_brnch"
-- ----------------------------
ALTER TABLE "lndr_brnch" ADD CONSTRAINT "r_427" FOREIGN KEY ("brnch_stat_cd") REFERENCES "brnch_stat_cd" ("brnch_stat_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_brnch" ADD CONSTRAINT "r_447" FOREIGN KEY ("brnch_type_cd") REFERENCES "brnch_type_cd" ("brnch_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_brnch" ADD CONSTRAINT "r_163" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_fnctn"
-- ----------------------------
ALTER TABLE "lndr_fnctn" ADD CONSTRAINT "r_434" FOREIGN KEY ("lndr_id") REFERENCES "lndr" ("lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan_borrwr"
-- ----------------------------
ALTER TABLE "loan_borrwr" ADD CONSTRAINT "r_497" FOREIGN KEY ("loan_id") REFERENCES "loan" ("loan_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan_ofcr"
-- ----------------------------
ALTER TABLE "loan_ofcr" ADD CONSTRAINT "r_681" FOREIGN KEY ("brnch_nbr", "lndr_id") REFERENCES "lndr_brnch" ("brnch_nbr", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "lndr_brnch_addr"
-- ----------------------------
ALTER TABLE "lndr_brnch_addr" ADD CONSTRAINT "r_284" FOREIGN KEY ("brnch_nbr", "lndr_id") REFERENCES "lndr_brnch" ("brnch_nbr", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_brnch_addr" ADD CONSTRAINT "r_285" FOREIGN KEY ("lndr_addr_type_cd") REFERENCES "lndr_addr_type_cd" ("lndr_addr_type_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "lndr_brnch_addr" ADD CONSTRAINT "r_292" FOREIGN KEY ("addr_id") REFERENCES "addr" ("addr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "borrwr"
-- ----------------------------
ALTER TABLE "borrwr" ADD CONSTRAINT "borrwr_tribal_afl" FOREIGN KEY ("trbl_afltn_cd") REFERENCES "trbl_afltn" ("trbl_afltn_cd") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Foreign keys structure for table "loan_orgntr"
-- ----------------------------
ALTER TABLE "loan_orgntr" ADD CONSTRAINT "r_721" FOREIGN KEY ("brnch_nbr", "lndr_id") REFERENCES "lndr_brnch" ("brnch_nbr", "lndr_id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE;

