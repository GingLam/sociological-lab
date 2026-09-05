/*! Local SPSS grammar for Highlight.js 11.11.2. */
const SPSS_COMMANDS = [
  "ADD DOCUMENT", "ADD FILES", "AGGREGATE", "ALTER TYPE", "AUTORECODE",
  "BEGIN DATA", "BEGIN PROGRAM", "BOOTSTRAP", "CASESTOVARS", "CD",
  "CODEBOOK", "COMPUTE", "CONJOINT", "CORRELATIONS", "COUNT", "CROSSTABS",
  "CURVEFIT", "DATA LIST", "DATASET ACTIVATE", "DATASET CLOSE", "DATASET COPY",
  "DATASET DECLARE", "DATASET DISPLAY", "DATASET NAME", "DELETE VARIABLES",
  "DESCRIPTIVES", "DISPLAY DICTIONARY", "DO IF", "ELSE", "ELSE IF", "END DATA",
  "END IF", "END LOOP", "END PROGRAM", "EXAMINE", "EXECUTE", "FACTOR",
  "FILE HANDLE", "FILTER", "FORMATS", "FREQUENCIES", "GENLOG", "GET DATA",
  "GET FILE", "GGRAPH", "GRAPH", "IF", "INCLUDE", "INSERT", "LIST", "LOGISTIC REGRESSION",
  "MATCH FILES", "MEANS", "MISSING VALUES", "MIXED", "MRSETS", "MULT RESPONSE",
  "NOMREG", "NPAR TESTS", "NUMERIC", "OMS", "OMSEND", "ONEWAY", "OUTPUT CLOSE",
  "OUTPUT EXPORT", "OUTPUT MODIFY", "PARTIAL CORR", "PLUM", "PPLOT", "PRESERVE",
  "RANK", "RECODE", "REGRESSION", "RELIABILITY", "RENAME VARIABLES", "RESTORE",
  "SAMPLE", "SAVE OUTFILE", "SELECT IF", "SET", "SHOW", "SORT CASES",
  "SORT VARIABLES", "SPLIT FILE", "STRING", "SUMMARIZE", "TEMPORARY", "T-TEST",
  "TITLE", "UNIANOVA", "VALUE LABELS", "VARIABLE LABELS", "VARSTOCASES",
  "WEIGHT"
].join(" ");

const SPSS_KEYWORDS = [
  "ALL", "AND", "ASCENDING", "BY", "DESCENDING", "EQ", "GE", "GT", "LE", "LT",
  "NE", "NOT", "OR", "SYSMIS", "THRU", "TO", "WITH"
].join(" ");

const SPSS_FUNCTIONS = [
  "ABS", "CDF.BETA", "CDF.CHISQ", "CDF.F", "CDF.NORMAL", "CDF.T", "CHAR.INDEX",
  "CHAR.LENGTH", "CONCAT", "CTIME.DAYS", "DATE.DMY", "LAG", "LN", "LOWER",
  "LPAD", "MAX", "MEAN", "MIN", "MOD", "NVALID", "RND", "SD", "SQRT",
  "STRING", "SUBSTR", "SUM", "TRUNC", "UPCASE", "VALUE"
].join(" ");

export default function spssGrammar(hljs) {
  return {
    name: "IBM SPSS Statistics Syntax",
    aliases: ["spss"],
    case_insensitive: true,
    keywords: {
      keyword: `${SPSS_COMMANDS} ${SPSS_KEYWORDS}`,
      built_in: SPSS_FUNCTIONS,
      literal: "TRUE FALSE"
    },
    contains: [
      {
        className: "comment",
        begin: /^\s*(?:\*|COMMENT\b)/,
        end: /\.\s*$/,
        relevance: 10
      },
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "meta",
        begin: /^\s*\/[A-Z][A-Z0-9_-]*/,
        relevance: 5
      },
      {
        className: "string",
        variants: [
          { begin: /"/, end: /"/ },
          { begin: /'/, end: /'/ }
        ]
      },
      {
        className: "number",
        begin: /(?:\b\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?\b/,
        relevance: 0
      },
      {
        className: "operator",
        begin: /\*\*|~=|<>|<=|>=|=|<|>|\+|-|\*|\//,
        relevance: 0
      }
    ]
  };
}
