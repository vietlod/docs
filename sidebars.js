/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "ecodataSidebar": [
    "ecodata/overview",
    "ecodata/faq",
    {
      "type": "category",
      "label": "Bắt đầu",
      "collapsed": false,
      "items": [
        "ecodata/bat-dau/huong-dan-nhanh",
        "ecodata/bat-dau/login-filter-preview-export"
      ]
    },
    {
      "type": "category",
      "label": "Nguồn dữ liệu",
      "collapsed": false,
      "items": [
        "ecodata/nguon-du-lieu/phan-nhom-nguon-du-lieu"
      ]
    },
    {
      "type": "category",
      "label": "Indicators",
      "collapsed": false,
      "items": [
        "ecodata/indicators/tong-hop-indicators",
        "ecodata/indicators/global-data",
        "ecodata/indicators/gso-vietnam",
        "ecodata/indicators/customs",
        "ecodata/indicators/macro-survey-vhlss",
        "ecodata/indicators/stock-hub"
      ]
    },
    {
      "type": "category",
      "label": "Từ điển & phương pháp",
      "collapsed": false,
      "items": [
        "ecodata/du-lieu/data-dictionary",
        "ecodata/du-lieu/methodology"
      ]
    },
    {
      "type": "category",
      "label": "Công cụ hỗ trợ",
      "collapsed": false,
      "items": [
        "ecodata/cong-cu/ai-chat",
        "ecodata/cong-cu/econometrics"
      ]
    },
    {
      "type": "category",
      "label": "Xuất dữ liệu",
      "collapsed": false,
      "items": [
        "ecodata/xuat-du-lieu/preview-export"
      ]
    },
    {
      "type": "category",
      "label": "Quản trị và triển khai",
      "collapsed": true,
      "items": [
        "ecodata/admin/quan-tri-du-lieu",
        "ecodata/trien-khai/docusaurus-vps"
      ]
    }
  ],
  "ecolabSidebar": [
    "ecolab/overview",
    {
      "type": "category",
      "label": "Bắt đầu",
      "collapsed": false,
      "items": [
        "ecolab/bat-dau/login-navigation"
      ]
    },
    {
      "type": "category",
      "label": "Đồ thị & Tra cứu RAG",
      "collapsed": false,
      "items": [
        "ecolab/rag-knowledge-graph"
      ]
    },
    {
      "type": "category",
      "label": "Phân tích Định lượng",
      "collapsed": false,
      "items": [
        "ecolab/econometrics-modeling"
      ]
    },
    {
      "type": "category",
      "label": "Mô hình kinh tế lượng",
      "collapsed": false,
      "items": [
        "ecolab/model/group",
        {
          "type": "category",
          "label": "1. Hồi quy tuyến tính cổ điển",
          "items": [
            "ecolab/model/ols",
            "ecolab/model/wls",
            "ecolab/model/gls",
            "ecolab/model/tls"
          ]
        },
        {
          "type": "category",
          "label": "2. Hồi quy chính quy hóa",
          "items": [
            "ecolab/model/ridge",
            "ecolab/model/lasso",
            "ecolab/model/elastic-net",
            "ecolab/model/adaptive-lasso"
          ]
        },
        {
          "type": "category",
          "label": "3. Dữ liệu bảng tuyến tính",
          "items": [
            "ecolab/model/pooled-ols",
            "ecolab/model/fem-rem",
            "ecolab/model/between"
          ]
        },
        {
          "type": "category",
          "label": "4. Dữ liệu bảng động",
          "items": [
            "ecolab/model/gmm"
          ]
        },
        {
          "type": "category",
          "label": "5. Biến phụ thuộc giới hạn",
          "items": [
            "ecolab/model/logit",
            "ecolab/model/probit",
            "ecolab/model/tobit",
            "ecolab/model/truncated",
            "ecolab/model/heckman"
          ]
        },
        {
          "type": "category",
          "label": "6. Dữ liệu đếm",
          "items": [
            "ecolab/model/poisson",
            "ecolab/model/negbin",
            "ecolab/model/zip",
            "ecolab/model/zinb"
          ]
        },
        {
          "type": "category",
          "label": "7. Hồi quy phân vị",
          "items": [
            "ecolab/model/quantile",
            "ecolab/model/panel-quantile"
          ]
        },
        {
          "type": "category",
          "label": "8. Chuỗi thời gian đơn biến",
          "items": [
            "ecolab/model/arima",
            "ecolab/model/sarima",
            "ecolab/model/garch",
            "ecolab/model/egarch",
            "ecolab/model/ardl"
          ]
        },
        {
          "type": "category",
          "label": "9. Chuỗi thời gian đa biến",
          "items": [
            "ecolab/model/var",
            "ecolab/model/vecm",
            "ecolab/model/svar"
          ]
        },
        {
          "type": "category",
          "label": "10. IV & hệ phương trình",
          "items": [
            "ecolab/model/iv-2sls",
            "ecolab/model/3sls",
            "ecolab/model/sur"
          ]
        },
        {
          "type": "category",
          "label": "11. Phi tuyến & bán tham số",
          "items": [
            "ecolab/model/nls",
            "ecolab/model/gam"
          ]
        },
        {
          "type": "category",
          "label": "12. Suy luận nhân quả",
          "items": [
            "ecolab/model/did",
            "ecolab/model/psm",
            "ecolab/model/rdd"
          ]
        },
        {
          "type": "category",
          "label": "13. Hệ thống cầu & BLP",
          "items": [
            "ecolab/model/demand-systems-blp"
          ]
        },
        {
          "type": "category",
          "label": "14. Biên hiệu quả & TFP",
          "items": [
            "ecolab/model/frontier-tfp-decomposition"
          ]
        },
        {
          "type": "category",
          "label": "15. Bootstrap & Causal ML",
          "items": [
            "ecolab/model/bootstrap-highdim-inference"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Ví dụ thực nghiệm",
      "collapsed": false,
      "items": [
        "ecolab/vi-du/fdi-tang-truong-ardl",
        "ecolab/vi-du/no-cong-tang-truong-panel",
        "ecolab/vi-du/luong-giao-duc-ols",
        "ecolab/vi-du/iv-loi-suat-giao-duc",
        "ecolab/vi-du/vo-no-logit",
        "ecolab/vi-du/bang-sang-che-count",
        "ecolab/vi-du/bat-binh-dang-quantile",
        "ecolab/vi-du/du-bao-lam-phat-lasso",
        "ecolab/vi-du/var-vimo",
        "ecolab/vi-du/duong-cong-engel-gam",
        "ecolab/vi-du/rdd-hoc-bong"
      ]
    },
    {
      "type": "category",
      "label": "Tài khoản & Thanh toán",
      "collapsed": false,
      "items": [
        "ecolab/membership-billing"
      ]
    }
  ],
  "fincoSidebar": [
    "finco/overview",
    {
      "type": "category",
      "label": "Thị trường tài chính & Hàng hóa",
      "collapsed": false,
      "items": [
        "finco/stock-market",
        "finco/commodity-market",
        "finco/main-markets"
      ]
    },
    {
      "type": "category",
      "label": "Kinh tế vĩ mô & Quốc tế",
      "collapsed": false,
      "items": [
        "finco/vietnam-macro",
        "finco/global-data"
      ]
    },
    {
      "type": "category",
      "label": "Nghiên cứu & StockMCP AI",
      "collapsed": false,
      "items": [
        "finco/data-export-research",
        "finco/stockmcp-guide"
      ]
    }
  ],
  "vietlodSidebar": [
    "vietlod/overview",
    {
      "type": "category",
      "label": "Chương 01. Hồi quy tuyến tính cổ điển và biến công cụ",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-01/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 1.1. Bình phương nhỏ nhất",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-01/group-1-1/index"
          },
          "items": [
            "vietlod/chapter-01/group-1-1/b001-ols",
            "vietlod/chapter-01/group-1-1/b002-wls",
            "vietlod/chapter-01/group-1-1/b003-gls",
            "vietlod/chapter-01/group-1-1/b004-fgls"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 1.2. Hồi quy kháng nhiễu và phân vị",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-01/group-1-2/index"
          },
          "items": [
            "vietlod/chapter-01/group-1-2/b005-robust-rlm",
            "vietlod/chapter-01/group-1-2/b006-quantile-regression"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 1.3. Biến công cụ cổ điển",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-01/group-1-3/index"
          },
          "items": [
            "vietlod/chapter-01/group-1-3/b007-iv-2sls",
            "vietlod/chapter-01/group-1-3/b008-iv-liml"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 1.4. Hiệu ứng cố định đa chiều và biến công cụ hiện đại",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-01/group-1-4/index"
          },
          "items": [
            "vietlod/chapter-01/group-1-4/b009-hdfe-ols",
            "vietlod/chapter-01/group-1-4/b010-hdfe-iv",
            "vietlod/chapter-01/group-1-4/b011-bartik-shift-share-iv",
            "vietlod/chapter-01/group-1-4/b012-lewbel-het-iv",
            "vietlod/chapter-01/group-1-4/b013-control-function-iv",
            "vietlod/chapter-01/group-1-4/b014-iv-quantile"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 02. Mô hình chính quy hóa, suy luận chiều cao và giảm chiều",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-02/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 2.1. Hồi quy chính quy hóa",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-02/group-2-1/index"
          },
          "items": [
            "vietlod/chapter-02/group-2-1/b015-ridge",
            "vietlod/chapter-02/group-2-1/b016-lasso",
            "vietlod/chapter-02/group-2-1/b017-elastic-net"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 2.2. Chọn mô hình và suy luận chiều cao",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-02/group-2-2/index"
          },
          "items": [
            "vietlod/chapter-02/group-2-2/b018-lasso-lars",
            "vietlod/chapter-02/group-2-2/b019-elastic-net-cv",
            "vietlod/chapter-02/group-2-2/b020-adaptive-lasso",
            "vietlod/chapter-02/group-2-2/b021-post-lasso-ols"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 2.3. Giảm chiều và nhân tố ẩn",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-02/group-2-3/index"
          },
          "items": [
            "vietlod/chapter-02/group-2-3/b022-pcr",
            "vietlod/chapter-02/group-2-3/b023-pls-regression",
            "vietlod/chapter-02/group-2-3/b024-pca-factors",
            "vietlod/chapter-02/group-2-3/b025-factor-analysis"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 2.4. Phân cụm chế độ kinh tế",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-02/group-2-4/index"
          },
          "items": [
            "vietlod/chapter-02/group-2-4/b026-kmeans-clustering"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 03. Mô hình lựa chọn rời rạc và cầu cấu trúc",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-03/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 3.1. Lựa chọn nhị phân",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-03/group-3-1/index"
          },
          "items": [
            "vietlod/chapter-03/group-3-1/b027-logit",
            "vietlod/chapter-03/group-3-1/b028-probit",
            "vietlod/chapter-03/group-3-1/b029-cloglog",
            "vietlod/chapter-03/group-3-1/b030-heteroskedastic-probit",
            "vietlod/chapter-03/group-3-1/b031-bivariate-probit"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 3.2. Lựa chọn đa phân loại",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-03/group-3-2/index"
          },
          "items": [
            "vietlod/chapter-03/group-3-2/b032-mnlogit",
            "vietlod/chapter-03/group-3-2/b033-conditional-logit",
            "vietlod/chapter-03/group-3-2/b034-nested-logit",
            "vietlod/chapter-03/group-3-2/b035-multinomial-probit"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 3.3. Lựa chọn có thứ tự",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-03/group-3-3/index"
          },
          "items": [
            "vietlod/chapter-03/group-3-3/b036-ordered-logit",
            "vietlod/chapter-03/group-3-3/b037-ordered-probit"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 3.4. Mô hình Logit hỗn hợp",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-03/group-3-4/index"
          },
          "items": [
            "vietlod/chapter-03/group-3-4/b038-mixed-logit"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 3.5. Lựa chọn dữ liệu bảng và cầu cấu trúc",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-03/group-3-5/index"
          },
          "items": [
            "vietlod/chapter-03/group-3-5/b039-panel-logit-fe-cre",
            "vietlod/chapter-03/group-3-5/b040-berry-blp-logit-iv"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 04. Mô hình đếm, lực hấp dẫn thương mại và biến phụ thuộc giới hạn",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-04/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 4.1. Mô hình đếm cơ sở và lực hấp dẫn",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-04/group-4-1/index"
          },
          "items": [
            "vietlod/chapter-04/group-4-1/b041-poisson",
            "vietlod/chapter-04/group-4-1/b042-negative-binomial",
            "vietlod/chapter-04/group-4-1/b043-generalized-poisson",
            "vietlod/chapter-04/group-4-1/b044-ppml-hdfe"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 4.2. Mô hình lạm phát số 0 và rào cản",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-04/group-4-2/index"
          },
          "items": [
            "vietlod/chapter-04/group-4-2/b045-zero-inflated-poisson",
            "vietlod/chapter-04/group-4-2/b046-zero-inflated-negbin",
            "vietlod/chapter-04/group-4-2/b047-hurdle-count"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 4.3. Mô hình kiểm duyệt và chọn mẫu",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-04/group-4-3/index"
          },
          "items": [
            "vietlod/chapter-04/group-4-3/b048-tobit",
            "vietlod/chapter-04/group-4-3/b049-truncated-regression",
            "vietlod/chapter-04/group-4-3/b050-heckman-selection",
            "vietlod/chapter-04/group-4-3/b051-endogenous-switching"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 4.4. Mô hình nghiệm góc và tỷ trọng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-04/group-4-4/index"
          },
          "items": [
            "vietlod/chapter-04/group-4-4/b052-double-hurdle",
            "vietlod/chapter-04/group-4-4/b053-two-part-continuous",
            "vietlod/chapter-04/group-4-4/b054-fractional-logit",
            "vietlod/chapter-04/group-4-4/b055-beta-regression"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 05. Kinh tế lượng dữ liệu bảng tĩnh, động và phụ thuộc chéo",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-05/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 5.1. Dữ liệu bảng tĩnh",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-1/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-1/b056-pooled-ols",
            "vietlod/chapter-05/group-5-1/b057-panel-fe",
            "vietlod/chapter-05/group-5-1/b058-panel-re",
            "vietlod/chapter-05/group-5-1/b059-between-ols",
            "vietlod/chapter-05/group-5-1/b060-first-difference",
            "vietlod/chapter-05/group-5-1/b061-mundlak-cre",
            "vietlod/chapter-05/group-5-1/b062-fama-macbeth",
            "vietlod/chapter-05/group-5-1/b063-pcse-panel",
            "vietlod/chapter-05/group-5-1/b064-driscoll-kraay-fe"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 5.2. Dữ liệu bảng động",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-2/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-2/b065-arellano-bond",
            "vietlod/chapter-05/group-5-2/b066-blundell-bond",
            "vietlod/chapter-05/group-5-2/b067-bias-corrected-lsdv"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 5.3. Biến công cụ dữ liệu bảng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-3/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-3/b068-panel-iv-2sls",
            "vietlod/chapter-05/group-5-3/b069-panel-gmm",
            "vietlod/chapter-05/group-5-3/b070-hausman-taylor"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 5.4. Đồng tích hợp và ARDL dữ liệu bảng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-4/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-4/b071-panel-fmols",
            "vietlod/chapter-05/group-5-4/b072-panel-dols",
            "vietlod/chapter-05/group-5-4/b073-pmg",
            "vietlod/chapter-05/group-5-4/b074-mg",
            "vietlod/chapter-05/group-5-4/b075-dfe-panel-ardl"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 5.5. Dữ liệu bảng phụ thuộc chéo thế hệ 2",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-5/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-5/b076-pesaran-cips",
            "vietlod/chapter-05/group-5-5/b077-westerlund-coint",
            "vietlod/chapter-05/group-5-5/b078-cce-mg",
            "vietlod/chapter-05/group-5-5/b079-ccep",
            "vietlod/chapter-05/group-5-5/b080-cs-ardl"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 5.6. Ngưỡng và phân vị dữ liệu bảng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-05/group-5-6/index"
          },
          "items": [
            "vietlod/chapter-05/group-5-6/b081-panel-threshold",
            "vietlod/chapter-05/group-5-6/b082-dynamic-panel-threshold",
            "vietlod/chapter-05/group-5-6/b083-panel-quantile-mmqr"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 06. Chuỗi thời gian đơn biến, phi tuyến, điểm gãy và bong bóng",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-06/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 6.1. Kiểm định nghiệm đơn vị và đồng tích hợp",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-06/group-6-1/index"
          },
          "items": [
            "vietlod/chapter-06/group-6-1/b084-adf",
            "vietlod/chapter-06/group-6-1/b085-phillips-perron",
            "vietlod/chapter-06/group-6-1/b086-df-gls",
            "vietlod/chapter-06/group-6-1/b087-kpss",
            "vietlod/chapter-06/group-6-1/b088-zivot-andrews",
            "vietlod/chapter-06/group-6-1/b089-johansen"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 6.2. Dự báo chuỗi thời gian đơn biến",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-06/group-6-2/index"
          },
          "items": [
            "vietlod/chapter-06/group-6-2/b090-ar",
            "vietlod/chapter-06/group-6-2/b091-ma",
            "vietlod/chapter-06/group-6-2/b092-arma",
            "vietlod/chapter-06/group-6-2/b093-arima",
            "vietlod/chapter-06/group-6-2/b094-sarima"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 6.3. Mô hình trễ phân phối tự hồi quy (ARDL)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-06/group-6-3/index"
          },
          "items": [
            "vietlod/chapter-06/group-6-3/b095-ardl",
            "vietlod/chapter-06/group-6-3/b096-uecm",
            "vietlod/chapter-06/group-6-3/b097-nardl",
            "vietlod/chapter-06/group-6-3/b098-qardl"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 6.4. Mô hình không gian trạng thái",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-06/group-6-4/index"
          },
          "items": [
            "vietlod/chapter-06/group-6-4/b099-sarimax",
            "vietlod/chapter-06/group-6-4/b100-unobserved-components",
            "vietlod/chapter-06/group-6-4/b101-dynamic-factor"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 6.5. Chuỗi thời gian phi tuyến, điểm gãy và bong bóng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-06/group-6-5/index"
          },
          "items": [
            "vietlod/chapter-06/group-6-5/b102-threshold-regression",
            "vietlod/chapter-06/group-6-5/b103-star-smooth-transition",
            "vietlod/chapter-06/group-6-5/b104-midas-regression",
            "vietlod/chapter-06/group-6-5/b105-bai-perron-break",
            "vietlod/chapter-06/group-6-5/b106-psy-bubble-gsadf"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 07. Chuỗi thời gian đa biến, chiếu cục bộ và mạng lan tỏa",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-07/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 7.1. Hệ mô hình tự hồi quy vectơ (VAR, VECM, SVAR)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-07/group-7-1/index"
          },
          "items": [
            "vietlod/chapter-07/group-7-1/b107-var",
            "vietlod/chapter-07/group-7-1/b110-vecm",
            "vietlod/chapter-07/group-7-1/b111-svar",
            "vietlod/chapter-07/group-7-1/b112-bvar"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 7.2. Nhân quả Granger và hàm phản ứng xung",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-07/group-7-2/index"
          },
          "items": [
            "vietlod/chapter-07/group-7-2/b108-granger-causality",
            "vietlod/chapter-07/group-7-2/b109-impulse-response"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 7.3. Phương pháp chiếu cục bộ (LP)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-07/group-7-3/index"
          },
          "items": [
            "vietlod/chapter-07/group-7-3/b113-local-projections",
            "vietlod/chapter-07/group-7-3/b114-local-projections-iv",
            "vietlod/chapter-07/group-7-3/b115-panel-local-projections"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 7.4. Mô hình VAR tham số biến thiên và mạng lan tỏa",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-07/group-7-4/index"
          },
          "items": [
            "vietlod/chapter-07/group-7-4/b116-favar",
            "vietlod/chapter-07/group-7-4/b117-tvp-var",
            "vietlod/chapter-07/group-7-4/b118-spillover-connectedness"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 7.5. Mô hình tự hồi quy ngưỡng và chuyển chế độ Markov",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-07/group-7-5/index"
          },
          "items": [
            "vietlod/chapter-07/group-7-5/b119-setar",
            "vietlod/chapter-07/group-7-5/b120-markov-regression",
            "vietlod/chapter-07/group-7-5/b121-ms-var"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 08. Độ biến động tài chính, định giá tài sản và rủi ro hệ thống",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-08/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 8.1. Họ mô hình phương sai thay đổi có điều kiện (ARCH, GARCH)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-08/group-8-1/index"
          },
          "items": [
            "vietlod/chapter-08/group-8-1/b122-arch",
            "vietlod/chapter-08/group-8-1/b123-garch",
            "vietlod/chapter-08/group-8-1/b124-egarch",
            "vietlod/chapter-08/group-8-1/b125-gjr-garch",
            "vietlod/chapter-08/group-8-1/b126-tarch",
            "vietlod/chapter-08/group-8-1/b127-aparch",
            "vietlod/chapter-08/group-8-1/b128-figarch"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 8.2. Độ biến động thực tế, tần suất hỗn hợp và rủi ro đuôi",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-08/group-8-2/index"
          },
          "items": [
            "vietlod/chapter-08/group-8-2/b129-ewma-volatility",
            "vietlod/chapter-08/group-8-2/b130-har-rv",
            "vietlod/chapter-08/group-8-2/b131-garch-midas",
            "vietlod/chapter-08/group-8-2/b132-covar-systemic-risk"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 8.3. Độ biến động đa biến",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-08/group-8-3/index"
          },
          "items": [
            "vietlod/chapter-08/group-8-3/b133-ccc-garch",
            "vietlod/chapter-08/group-8-3/b134-dcc-garch"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 8.4. Định giá tài sản đa nhân tố",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-08/group-8-4/index"
          },
          "items": [
            "vietlod/chapter-08/group-8-4/b135-grs-factor-pricing"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 09. Suy luận nhân quả và đánh giá tác động chính sách",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-09/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 9.1. Ghép cặp và cân bằng mẫu",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-09/group-9-1/index"
          },
          "items": [
            "vietlod/chapter-09/group-9-1/b136-propensity-score-matching",
            "vietlod/chapter-09/group-9-1/b137-entropy-balancing"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 9.2. Sai biệt trong sai biệt cổ điển và nghiên cứu sự kiện",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-09/group-9-2/index"
          },
          "items": [
            "vietlod/chapter-09/group-9-2/b140-twfe-did",
            "vietlod/chapter-09/group-9-2/b141-event-study-did",
            "vietlod/chapter-09/group-9-2/b143-callaway-santanna-did"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 9.3. Hồi quy gián đoạn, gãy khúc, tích tụ và hiệu ứng biên",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-09/group-9-3/index"
          },
          "items": [
            "vietlod/chapter-09/group-9-3/b153-sharp-rdd",
            "vietlod/chapter-09/group-9-3/b154-fuzzy-rdd",
            "vietlod/chapter-09/group-9-3/b155-rdrobust-sharp-fuzzy",
            "vietlod/chapter-09/group-9-3/b156-regression-kink-rkd",
            "vietlod/chapter-09/group-9-3/b157-bunching-estimator",
            "vietlod/chapter-09/group-9-3/b158-marginal-treatment-effects"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 9.4. Trọng số xác suất nghịch đảo, đối chứng tổng hợp và học máy nhân quả",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-09/group-9-4/index"
          },
          "items": [
            "vietlod/chapter-09/group-9-4/b138-ipw",
            "vietlod/chapter-09/group-9-4/b139-aipw",
            "vietlod/chapter-09/group-9-4/b150-synthetic-control",
            "vietlod/chapter-09/group-9-4/b151-augmented-synthetic-control",
            "vietlod/chapter-09/group-9-4/b159-double-ml",
            "vietlod/chapter-09/group-9-4/b160-causal-forest"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 9.5. Sai biệt trong sai biệt lệch pha hiện đại",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-09/group-9-5/index"
          },
          "items": [
            "vietlod/chapter-09/group-9-5/b142-bacon-decomposition",
            "vietlod/chapter-09/group-9-5/b144-sun-abraham-did",
            "vietlod/chapter-09/group-9-5/b145-borusyak-imputation-did",
            "vietlod/chapter-09/group-9-5/b146-dechaisemartin-did",
            "vietlod/chapter-09/group-9-5/b147-wooldridge-etwfe",
            "vietlod/chapter-09/group-9-5/b148-lp-did",
            "vietlod/chapter-09/group-9-5/b149-honest-did-sensitivity",
            "vietlod/chapter-09/group-9-5/b152-synthetic-did"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 10. Kinh tế lượng không gian, sai số chuẩn Conley và mạng cặp đôi",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-10/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 10.1. Hồi quy không gian cắt ngang",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-10/group-10-1/index"
          },
          "items": [
            "vietlod/chapter-10/group-10-1/b161-slx-spatial-x",
            "vietlod/chapter-10/group-10-1/b162-sar-spatial-lag",
            "vietlod/chapter-10/group-10-1/b163-sem-spatial-error",
            "vietlod/chapter-10/group-10-1/b164-sdm-spatial-durbin",
            "vietlod/chapter-10/group-10-1/b165-sarar-sac-spatial"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 10.2. Dữ liệu bảng không gian",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-10/group-10-2/index"
          },
          "items": [
            "vietlod/chapter-10/group-10-2/b166-spatial-panel-fe",
            "vietlod/chapter-10/group-10-2/b167-spatial-panel-re"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 10.3. Hồi quy địa lý đa thang đo và sai số chuẩn Conley",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-10/group-10-3/index"
          },
          "items": [
            "vietlod/chapter-10/group-10-3/b168-mgwr-spatial",
            "vietlod/chapter-10/group-10-3/b169-conley-spatial-hac"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 10.4. Kinh tế lượng mạng lưới",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-10/group-10-4/index"
          },
          "items": [
            "vietlod/chapter-10/group-10-4/b170-network-peer-effects"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 11. Phân tích sống sót, thời gian sự kiện và rủi ro cạnh tranh",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-11/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 11.1. Phân tích sống sót phi tham số",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-11/group-11-1/index"
          },
          "items": [
            "vietlod/chapter-11/group-11-1/b171-kaplan-meier",
            "vietlod/chapter-11/group-11-1/b172-nelson-aalen"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 11.2. Mô hình nguy cơ tỷ lệ bán tham số Cox",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-11/group-11-2/index"
          },
          "items": [
            "vietlod/chapter-11/group-11-2/b173-cox-ph",
            "vietlod/chapter-11/group-11-2/b174-cox-time-varying"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 11.3. Mô hình thời gian thất bại tăng tốc tham số (AFT)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-11/group-11-3/index"
          },
          "items": [
            "vietlod/chapter-11/group-11-3/b175-weibull-aft",
            "vietlod/chapter-11/group-11-3/b176-lognormal-aft"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 11.4. Nguy cơ thời gian rời rạc và rủi ro cạnh tranh",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-11/group-11-4/index"
          },
          "items": [
            "vietlod/chapter-11/group-11-4/b177-discrete-time-hazard",
            "vietlod/chapter-11/group-11-4/b178-fine-gray-competing-risks"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 12. Hệ phương trình đồng thời, hệ cầu, kinh tế lượng Bayes và học máy",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-12/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 12.1. Hệ phương trình đồng thời và hệ cầu cấu trúc",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-12/group-12-1/index"
          },
          "items": [
            "vietlod/chapter-12/group-12-1/b179-sur",
            "vietlod/chapter-12/group-12-1/b180-three-stage-ls",
            "vietlod/chapter-12/group-12-1/b181-system-gmm",
            "vietlod/chapter-12/group-12-1/b182-quaids-demand-system"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 12.2. Kinh tế lượng Bayes và trung bình hóa mô hình (BMA)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-12/group-12-2/index"
          },
          "items": [
            "vietlod/chapter-12/group-12-2/b183-bayesian-linear",
            "vietlod/chapter-12/group-12-2/b184-bayesian-var",
            "vietlod/chapter-12/group-12-2/b185-bma-model-averaging"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 12.3. Học máy kinh tế lượng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-12/group-12-3/index"
          },
          "items": [
            "vietlod/chapter-12/group-12-3/b186-random-forest-regressor",
            "vietlod/chapter-12/group-12-3/b187-gradient-boosting-regressor",
            "vietlod/chapter-12/group-12-3/b188-svr-econometric",
            "vietlod/chapter-12/group-12-3/b189-mlp-regressor"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 12.4. Mạng nơ-ron chuỗi thời gian",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-12/group-12-4/index"
          },
          "items": [
            "vietlod/chapter-12/group-12-4/b190-lstm-forecaster"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 13. Phân phối thu nhập và phân rã bất bình đẳng",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-13/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 13.1. Phân rã khoảng cách và phân phối bất bình đẳng",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-13/group-13-1/index"
          },
          "items": [
            "vietlod/chapter-13/group-13-1/b191-oaxaca-blinder",
            "vietlod/chapter-13/group-13-1/b192-rif-regression",
            "vietlod/chapter-13/group-13-1/b193-oaxaca-rif-decomposition"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 14. Năng suất, biên hiệu quả và hàm sản xuất cấu trúc",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-14/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 14.1. Biên hiệu quả và năng suất nhân tố tổng hợp (TFP)",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-14/group-14-1/index"
          },
          "items": [
            "vietlod/chapter-14/group-14-1/b194-sfa-frontier",
            "vietlod/chapter-14/group-14-1/b195-dea-efficiency",
            "vietlod/chapter-14/group-14-1/b196-malmquist-productivity",
            "vietlod/chapter-14/group-14-1/b197-acf-production-tfp"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "Chương 15. Kinh tế lượng phi tham số và suy luận tái lấy mẫu cụm ít",
      "link": {
        "type": "doc",
        "id": "vietlod/chapter-15/index"
      },
      "items": [
        {
          "type": "category",
          "label": "Nhóm 15.1. Hồi quy phi tham số và bán tham số",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-15/group-15-1/index"
          },
          "items": [
            "vietlod/chapter-15/group-15-1/b198-local-polynomial-npregress",
            "vietlod/chapter-15/group-15-1/b199-gam-semiparametric"
          ]
        },
        {
          "type": "category",
          "label": "Nhóm 15.2. Suy luận tái lấy mẫu cụm ít và ngẫu nhiên hóa",
          "link": {
            "type": "doc",
            "id": "vietlod/chapter-15/group-15-2/index"
          },
          "items": [
            "vietlod/chapter-15/group-15-2/b200-wild-cluster-bootstrap",
            "vietlod/chapter-15/group-15-2/b201-randomization-inference"
          ]
        }
      ]
    }
  ]
};

export default sidebars;
