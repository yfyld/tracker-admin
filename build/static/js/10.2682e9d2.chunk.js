(window['webpackJsonptracker-web'] = window['webpackJsonptracker-web'] || []).push([
  [10],
  {
    1047: function (e, t, a) {
      'use strict';
      var n = a(87),
        r = a(0),
        l = a(197),
        i = a(72),
        c = a(1039),
        o = a(1040),
        u = a(1187),
        s = a(23),
        p = a(1051),
        m = a.n(p),
        d = a(1186),
        f = l.a.Option;
      l.a.OptGroup;
      t.a = function (e) {
        var t = e.fieldList,
          a = e.filterInfo,
          p = e.onChange,
          v = r.useState([]),
          E = Object(n.a)(v, 2),
          y = E[0],
          O = E[1],
          g = function (e, n) {
            var r = JSON.parse(JSON.stringify(a));
            (r.filterValues[n].key = e), (r.filterValues[n].type = 'equal'), (r.filterValues[n].value = []);
            var l = t.list.find(function (t) {
              return t.value === e;
            });
            l && O(l.recommend), p(r);
          },
          h = function (e, t) {
            var n = JSON.parse(JSON.stringify(a));
            (n.filterValues[t].type = e),
              (n.filterValues[t].value =
                'equal' === e || 'notEqual' === e ? [] : 'between' === e ? [null, null] : null),
              p(n);
          },
          _ = function (e, t) {
            var n = JSON.parse(JSON.stringify(a));
            (n.filterValues[t].value = e), p(n);
          };
        return r.createElement(
          'div',
          null,
          a.filterValues.length > 0 &&
            r.createElement(
              'div',
              { className: m.a.wrapper },
              a.filterValues.length > 1 &&
                r.createElement(
                  'div',
                  { className: m.a.type },
                  r.createElement(
                    i.a,
                    {
                      size: 'small',
                      onClick: function () {
                        var e = JSON.parse(JSON.stringify(a));
                        (e.filterType = 'AND' === e.filterType ? 'OR' : 'AND'), p(e);
                      }
                    },
                    'AND' === a.filterType ? '\u4e14' : '\u6216'
                  ),
                  r.createElement('div', { className: m.a.line })
                ),
              r.createElement(
                'div',
                { className: m.a.form },
                a.filterValues.map(function (e, n) {
                  return r.createElement(
                    c.a,
                    { gutter: 16, key: e.id },
                    r.createElement(
                      o.a,
                      { span: 5 },
                      r.createElement(
                        l.a,
                        {
                          value: e.key,
                          onChange: function (e) {
                            return g(e, n);
                          }
                        },
                        t.list.map(function (e) {
                          return r.createElement(f, { value: e.value, key: e.value }, e.name);
                        })
                      )
                    ),
                    r.createElement(
                      o.a,
                      { span: 3 },
                      r.createElement(
                        l.a,
                        {
                          value: e.type,
                          onChange: function (e) {
                            return h(e, n);
                          }
                        },
                        r.createElement(f, { value: 'equal' }, '\u7b49\u4e8e'),
                        r.createElement(f, { value: 'notEqual' }, '\u4e0d\u7b49\u4e8e'),
                        r.createElement(f, { value: 'isSet' }, '\u6709\u503c'),
                        r.createElement(f, { value: 'notSet' }, '\u6ca1\u503c'),
                        r.createElement(f, { value: 'greater' }, '\u5927\u4e8e'),
                        r.createElement(f, { value: 'less' }, '\u5c0f\u4e8e'),
                        r.createElement(f, { value: 'between' }, '\u533a\u95f4'),
                        r.createElement(f, { value: 'contain' }, '\u5305\u542b'),
                        r.createElement(f, { value: 'notContain' }, '\u4e0d\u5305\u542b'),
                        r.createElement(f, { value: 'isEmpty' }, '\u4e3a\u7a7a'),
                        r.createElement(f, { value: 'isNotEmpty' }, '\u4e0d\u4e3a\u7a7a'),
                        r.createElement(f, { value: 'rlike' }, '\u6b63\u5219\u5339\u914d'),
                        r.createElement(f, { value: 'notrlike' }, '\u6b63\u5219\u4e0d\u5339\u914d')
                      )
                    ),
                    'isEmpty' !== e.type &&
                      'isNotEmpty' !== e.type &&
                      'isSet' !== e.type &&
                      'notSet' !== e.type &&
                      'rlike' !== e.type &&
                      'notrlike' !== e.type &&
                      r.createElement(
                        o.a,
                        { span: 8 },
                        'equal' === e.type || 'notEqual' === e.type
                          ? r.createElement(
                              l.a,
                              {
                                value: e.value,
                                onChange: function (e) {
                                  return _(e, n);
                                },
                                mode: 'tags',
                                style: { width: '100%' },
                                tokenSeparators: [',']
                              },
                              y.map(function (e) {
                                return r.createElement(f, { key: e, value: e }, e);
                              })
                            )
                          : r.createElement(u.a, {
                              value: e.value,
                              dataSource: y,
                              style: { width: '100%' },
                              onChange: function (e) {
                                return _(e, n);
                              }
                            })
                      ),
                    r.createElement(
                      o.a,
                      { span: 1 },
                      r.createElement(
                        'div',
                        {
                          onClick: function () {
                            return (function (e) {
                              var t = JSON.parse(JSON.stringify(a));
                              t.filterValues.splice(e, 1), p(t);
                            })(n);
                          },
                          className: 'app-link ' + m.a.close
                        },
                        r.createElement(s.a, { type: 'minus-circle' })
                      )
                    )
                  );
                })
              )
            ),
          r.createElement(
            'a',
            {
              onClick: function () {
                var e = JSON.parse(JSON.stringify(a));
                e.filterValues.push({ type: null, key: null, value: null, id: Object(d.a)() }), p(e);
              },
              className: m.a.add
            },
            r.createElement(s.a, { type: 'plus-square' }),
            '\u6dfb\u52a0\u7b5b\u9009'
          )
        );
      };
    },
    1049: function (e, t, a) {
      e.exports = {
        wrapper: 'Indicator_wrapper__3B5qd',
        select: 'Indicator_select__1kP-z',
        content: 'Indicator_content__3-BaR',
        center: 'Indicator_center__3Oax_',
        metadataBox: 'Indicator_metadataBox__3wnAQ',
        active: 'Indicator_active__1aD9o',
        filter: 'Indicator_filter__lBazH'
      };
    },
    1050: function (e, t, a) {
      'use strict';
      var n = a(53),
        r = a(87),
        l = a(0),
        i = a(197),
        c = a(1042),
        o = a(1039),
        u = a(1040),
        s = a(505),
        p = a(247),
        m = a(23),
        d = a(1049),
        f = a.n(d),
        v = a(68),
        E = a(65),
        y = a(1047),
        O = a(1186),
        g = a(6);
      function h(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? h(a, !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : h(a).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
              });
        }
        return e;
      }
      var N = i.a.Option,
        b = (i.a.OptGroup, c.a.Search);
      t.a = Object(v.c)(
        function (e) {
          var t = e.metadata;
          return {
            activeMetadataList: t.activeMetadataList,
            activeMetadataListParams: t.activeMetadataListParams,
            tagList: t.tagList,
            fieldList: t.fieldList
          };
        },
        function (e) {
          return Object(E.b)(
            {
              onGetActiveMetadataList: function (e) {
                return g.z.request(e);
              }
            },
            e
          );
        }
      )(function (e) {
        var t = e.indicators,
          a = e.activeMetadataList,
          n = e.activeMetadataListParams,
          d = e.onChange,
          v = e.fieldList,
          E = e.hasType,
          g = e.addText,
          h = void 0 === g ? '+\u6dfb\u52a0\u6307\u6807' : g,
          P = e.hasCustomName,
          S = void 0 !== P && P,
          j = e.type,
          w = void 0 === j ? null : j,
          C = e.tagList,
          k = e.onGetActiveMetadataList,
          D = l.useState(_({}, n)),
          J = Object(r.a)(D, 2),
          A = J[0],
          L = J[1];
        function I(e, a) {
          var n = JSON.parse(JSON.stringify(t));
          (n[a].metadataCode = e.code), (n[a].metadataName = e.name), d(n, t[a]);
        }
        function V(e, a) {
          var n = JSON.parse(JSON.stringify(t));
          (n[a].filter = e), d(n);
        }
        function T(e, a) {
          var n = JSON.parse(JSON.stringify(t));
          (n[a].type = e), d(n);
        }
        function q(e) {
          k(e);
        }
        l.useEffect(
          function () {
            L(n);
          },
          [n]
        );
        var x = { name: '\u6240\u6709\u4e8b\u4ef6', code: '_ALL_METADATA' };
        return l.createElement(
          'div',
          { className: f.a.wrapper },
          l.createElement(
            'div',
            null,
            t.map(function (e, n) {
              return l.createElement(
                'div',
                { key: e.id },
                l.createElement(
                  o.a,
                  { className: f.a.item, gutter: 10 },
                  l.createElement(
                    u.a,
                    { span: 1 },
                    l.createElement('div', { className: f.a.center }, l.createElement(s.a, { color: 'gold' }, n + 1))
                  ),
                  l.createElement(
                    u.a,
                    { span: 3 },
                    l.createElement(
                      p.a,
                      {
                        overlay: l.createElement(
                          'div',
                          { className: f.a.content },
                          l.createElement(
                            'div',
                            {
                              onClick: function (e) {
                                return e.stopPropagation();
                              }
                            },
                            l.createElement(b, {
                              placeholder: '\u641c\u7d22\u4e8b\u4ef6',
                              value: A.name,
                              onChange: function (e) {
                                return L(_({}, A, { name: e.target.value }));
                              },
                              onSearch: function (e) {
                                return q(_({}, A, { name: e }));
                              },
                              style: { width: 200 }
                            }),
                            '\xa0',
                            l.createElement(
                              i.a,
                              {
                                placeholder: '\u6839\u636e\u6807\u7b7e\u7b5b\u9009',
                                style: { width: 200 },
                                mode: 'multiple',
                                value: A.tags
                                  ? A.tags.split(',').map(function (e) {
                                      return Number(e);
                                    })
                                  : [],
                                onChange: function (e) {
                                  return q(_({}, A, { tags: e.join(',') }));
                                }
                              },
                              C.list.map(function (e) {
                                return l.createElement(N, { key: e.id, value: e.id }, e.name);
                              })
                            )
                          ),
                          l.createElement(
                            'div',
                            { className: f.a.metadataBox },
                            l.createElement(
                              'span',
                              {
                                onClick: function () {
                                  return I(x, n);
                                },
                                className: x.code === e.metadataCode ? f.a.active : '',
                                key: x.code
                              },
                              '\u6240\u6709\u4e8b\u4ef6'
                            ),
                            a.list
                              .filter(function (e) {
                                return !w || e.type === w;
                              })
                              .map(function (t) {
                                return l.createElement(
                                  'span',
                                  {
                                    onClick: function () {
                                      return I(t, n);
                                    },
                                    className: t.code === e.metadataCode ? f.a.active : '',
                                    key: t.code
                                  },
                                  t.name
                                );
                              })
                          )
                        )
                      },
                      l.createElement(c.a, { value: e.metadataName, readOnly: !0, className: f.a.select })
                    )
                  ),
                  S &&
                    l.createElement(
                      u.a,
                      { span: 3 },
                      l.createElement(c.a, {
                        defaultValue: e.customName,
                        placeholder: '\u81ea\u5b9a\u4e49\u540d\u79f0',
                        onBlur: function (e) {
                          return (function (e, a) {
                            var n = JSON.parse(JSON.stringify(t));
                            (n[a].customName = e), d(n);
                          })(e.target.value, n);
                        }
                      })
                    ),
                  E &&
                    l.createElement(
                      l.Fragment,
                      null,
                      l.createElement(u.a, { span: 1 }, l.createElement('div', { className: f.a.center }, '\u7684')),
                      l.createElement(
                        u.a,
                        { span: 3 },
                        l.createElement(
                          i.a,
                          {
                            onChange: function (e) {
                              return T(e, n);
                            },
                            value: e.type
                          },
                          l.createElement(N, { value: 'PV' }, '\u603b\u6b21\u6570'),
                          l.createElement(N, { value: 'UV' }, '\u7528\u6237\u6570'),
                          l.createElement(N, { value: 'APV' }, '\u4eba\u5747\u6b21\u6570'),
                          l.createElement(N, { value: 'DPV' }, '\u65e5\u5747\u6b21\u6570'),
                          l.createElement(N, { value: 'DUV' }, '\u65e5\u5747\u7528\u6237\u6570')
                        )
                      )
                    ),
                  t.length > 1 &&
                    l.createElement(
                      u.a,
                      { span: 1 },
                      l.createElement(
                        'div',
                        {
                          onClick: function () {
                            return (function (e) {
                              var a = JSON.parse(JSON.stringify(t));
                              a.splice(e, 1), d(a, t[e]);
                            })(n);
                          },
                          className: 'app-link ' + f.a.center
                        },
                        l.createElement(m.a, { type: 'close' })
                      )
                    )
                ),
                l.createElement(
                  'div',
                  { className: f.a.filter },
                  l.createElement(y.a, {
                    fieldList: v,
                    filterInfo: e.filter,
                    onChange: function (e) {
                      return V(e, n);
                    }
                  })
                )
              );
            })
          ),
          l.createElement(
            'a',
            {
              onClick: function () {
                var e = JSON.parse(JSON.stringify(t));
                e.push({
                  metadataCode: '_ALL_METADATA',
                  metadataName: '\u6240\u6709\u4e8b\u4ef6',
                  type: 'PV',
                  id: Object(O.a)(),
                  filter: { filterType: 'AND', filterValues: [] }
                }),
                  d(e);
              }
            },
            h
          )
        );
      });
    },
    1051: function (e, t, a) {
      e.exports = {
        wrapper: 'Filter_wrapper__9rptJ',
        line: 'Filter_line__eOPS4',
        type: 'Filter_type__2GtXQ',
        form: 'Filter_form__1lfK0',
        close: 'Filter_close__1AZpi',
        add: 'Filter_add__2YNj8'
      };
    },
    1052: function (e, t, a) {
      'use strict';
      var n = a(334),
        r = a(53),
        l = a(87),
        i = a(0),
        c = a.n(i),
        o = a(1042),
        u = a(72),
        s = a(68),
        p = a(65),
        m = a(6),
        d = a(1053),
        f = a.n(d);
      function v(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function E(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? v(a, !0).forEach(function (t) {
                Object(r.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : v(a).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
              });
        }
        return e;
      }
      t.a = Object(s.c)(
        function (e) {
          return { reportInfo: e.report.reportInfo };
        },
        function (e) {
          return Object(p.b)(
            {
              handleAddReport: function (e) {
                return m.e.request(e);
              },
              handleUpdateReport: function (e) {
                return m.gb.request(e);
              }
            },
            e
          );
        }
      )(function (e) {
        var t = e.reportInfo,
          a = e.handleUpdateReport,
          r = e.handleAddReport,
          i = e.data,
          s = c.a.useState(t),
          p = Object(l.a)(s, 2),
          m = p[0],
          d = p[1];
        c.a.useEffect(
          function () {
            d(t);
          },
          [t]
        );
        return c.a.createElement(
          'div',
          { className: f.a.wrapper },
          c.a.createElement(
            'h2',
            { className: f.a.title },
            c.a.createElement(o.a, {
              type: 'text',
              onChange: function (e) {
                return d(E({}, m, { name: e.target.value }));
              },
              value: m.name
            })
          ),
          c.a.createElement(
            'div',
            { className: f.a.btns },
            c.a.createElement(
              u.a,
              {
                type: 'link',
                icon: 'save',
                onClick: function () {
                  'undefined' !== typeof t.id ? a(E({ id: null }, m, { data: i })) : r(E({}, m, { data: i }));
                }
              },
              '\u4fdd\u5b58'
            ),
            m.id &&
              c.a.createElement(
                u.a,
                {
                  type: 'link',
                  icon: 'save',
                  onClick: function () {
                    m.id;
                    var e = Object(n.a)(m, ['id']);
                    r(E({}, e, { data: i }));
                  }
                },
                '\u53e6\u5b58\u4e3a'
              ),
            c.a.createElement(u.a, { type: 'link', icon: 'plus-circle', onClick: function () {} }, '\u6dfb\u52a0\u5230')
          ),
          c.a.createElement(
            'div',
            { className: f.a.description },
            c.a.createElement(o.a, {
              onChange: function (e) {
                return d(E({}, m, { description: e.target.value }));
              },
              value: m.description
            })
          )
        );
      });
    },
    1053: function (e, t, a) {
      e.exports = {
        wrapper: 'AnalyseHeader_wrapper__1r0g1',
        btns: 'AnalyseHeader_btns__G6iwS',
        title: 'AnalyseHeader_title__1X3LF',
        description: 'AnalyseHeader_description__1fJOY'
      };
    },
    1133: function (e, t, a) {
      e.exports = {
        ruleTitle: 'Analyse_ruleTitle__3EBvq',
        preview: 'Analyse_preview__3BAIC',
        wrapper: 'Analyse_wrapper__14KR4',
        ruleSection: 'Analyse_ruleSection__3E7iy'
      };
    },
    1134: function (e, t, a) {
      e.exports = {
        wrapper: 'PathData_wrapper__p7PRs',
        select: 'PathData_select__CdiON',
        content: 'PathData_content__1usJl',
        center: 'PathData_center__bf1Ka',
        metadataBox: 'PathData_metadataBox__SFkXm',
        active: 'PathData_active__1ZvVM',
        pathString: 'PathData_pathString__33FXG',
        filter: 'PathData_filter__dCV3V',
        pageList: 'PathData_pageList__3IJ0R',
        pageItem: 'PathData_pageItem__2mtad',
        addPageBtn: 'PathData_addPageBtn__3gfgq',
        pageClose: 'PathData_pageClose__10U7Q',
        fatherPage: 'PathData_fatherPage__NfKXP'
      };
    },
    1176: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(53),
        r = a(197),
        l = a(1174),
        i = a(1042),
        c = a(1039),
        o = a(1040),
        u = a(72),
        s = a(342),
        p = a(0),
        m = a.n(p),
        d = a(333),
        f = a(1133),
        v = a.n(f),
        E = a(1050);
      var y = a(87),
        O = a(1177),
        g = a(1134),
        h = a.n(g),
        _ = a(505),
        N = a(1049),
        b = a.n(N),
        P = a(1047),
        S = a(1186),
        j = r.a.Option,
        w =
          (r.a.OptGroup,
          i.a.Search,
          function (e) {
            var t = e.indicators,
              a = e.onChange,
              n = e.fieldList,
              l = e.addText,
              i = void 0 === l ? '+\u6dfb\u52a0\u5b50\u9875\u9762' : l,
              s = e.pageData,
              m = e.parentInfo;
            function d(e, t) {
              var n = JSON.parse(JSON.stringify(s));
              (n.children[t].id = e), a(n);
            }
            function f(e, t) {
              var n = JSON.parse(JSON.stringify(s));
              (n.children[t].filter = e), a(n);
            }
            return p.createElement(
              'div',
              { className: b.a.wrapper },
              p.createElement(
                'div',
                null,
                s.children.map(function (e, l) {
                  return p.createElement(
                    'div',
                    { key: e.key },
                    p.createElement(
                      c.a,
                      { className: b.a.item, gutter: 10 },
                      p.createElement(
                        o.a,
                        { span: 1 },
                        p.createElement(
                          'div',
                          { className: b.a.center },
                          p.createElement(_.a, { color: 'gold' }, l + 1)
                        )
                      ),
                      p.createElement(
                        o.a,
                        { span: 8 },
                        p.createElement(
                          r.a,
                          {
                            value: e.id,
                            placeholder: '\u9009\u62e9\u5b50\u9875\u9762',
                            style: { width: '100%' },
                            onChange: function (e) {
                              return d(e, l);
                            }
                          },
                          t
                            .filter(function (e) {
                              return e.id !== m.id;
                            })
                            .map(function (e) {
                              return p.createElement(
                                j,
                                {
                                  key: e.id,
                                  value: e.id,
                                  disabled: !!s.children.find(function (t) {
                                    return t.id === e.id;
                                  })
                                },
                                e.customName || e.metadataName
                              );
                            })
                        )
                      ),
                      p.createElement(
                        o.a,
                        { span: 8 },
                        !e.filter.filterValues.find(function (e) {
                          return 'referrerId' === e.key;
                        }) &&
                          p.createElement(
                            u.a,
                            {
                              onClick: function () {
                                return (function (e) {
                                  var t = JSON.parse(JSON.stringify(s));
                                  t.children[e].filter.filterValues.push({
                                    key: 'referrerId',
                                    type: 'equal',
                                    value: [m.metadataCode],
                                    id: Object(S.a)()
                                  }),
                                    a(t);
                                })(l);
                              }
                            },
                            '\u5173\u8054referrer'
                          ),
                        '\xa0',
                        s.children.length > 1 &&
                          p.createElement(
                            u.a,
                            {
                              onClick: function () {
                                return (function (e) {
                                  var t = JSON.parse(JSON.stringify(s));
                                  t.children.splice(e, 1), a(t);
                                })(l);
                              }
                            },
                            '\u5220\u9664'
                          )
                      )
                    ),
                    p.createElement(
                      'div',
                      { className: b.a.filter },
                      p.createElement(P.a, {
                        fieldList: n,
                        filterInfo: e.filter,
                        onChange: function (e) {
                          return f(e, l);
                        }
                      })
                    )
                  );
                })
              ),
              p.createElement(
                'a',
                {
                  onClick: function () {
                    var e = JSON.parse(JSON.stringify(s));
                    e.children.push({
                      id: null,
                      key: Object(S.a)(),
                      filter: {
                        filterType: 'AND',
                        filterValues:
                          '_ALL_METADATA' !== m.metadataCode
                            ? [{ key: 'referrerId', type: 'equal', value: [m.metadataCode], id: Object(S.a)() }]
                            : []
                      }
                    }),
                      a(e);
                  }
                },
                i
              )
            );
          });
      function C(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function k(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? C(a, !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : C(a).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
              });
        }
        return e;
      }
      var D = r.a.Option,
        J = function (e) {
          var t = e.childPageData,
            a = e.indicators,
            n = e.onChange,
            l = e.fieldList,
            i = p.useState(!1),
            s = Object(y.a)(i, 2),
            m = s[0],
            d = s[1],
            f = p.useState([]),
            v = Object(y.a)(f, 2),
            E = (v[0], v[1], p.useState(null)),
            g = Object(y.a)(E, 2),
            _ = g[0],
            N = g[1],
            b = p.useState(null),
            P = Object(y.a)(b, 2),
            j = P[0],
            C = P[1];
          function J(e, a) {
            var r = JSON.parse(JSON.stringify(t));
            (r[a] = e), n(r);
          }
          var A = a.reduce(function (e, t) {
            return (e[t.id] = t), e;
          }, {});
          return p.createElement(
            'div',
            { className: h.a.wrapper },
            p.createElement(
              O.a,
              {
                width: 840,
                title: '\u7f16\u8f91\u4e0b\u6e38\u9875\u9762',
                placement: 'right',
                closable: !1,
                onClose: function () {
                  d(!1),
                    J(
                      k({}, j, {
                        children: j.children.filter(function (e) {
                          return e.id;
                        })
                      }),
                      _
                    );
                },
                visible: m
              },
              j &&
                p.createElement(w, {
                  parentInfo: A[j.parentId],
                  pageData: j,
                  fieldList: l,
                  addText: '+\u6dfb\u52a0\u5b50\u9875\u9762',
                  indicators: a,
                  onChange: C
                })
            ),
            p.createElement(
              'div',
              null,
              t.map(function (e, l) {
                return p.createElement(
                  'div',
                  { key: e.key },
                  p.createElement(
                    c.a,
                    { className: h.a.item, gutter: 10 },
                    p.createElement(
                      o.a,
                      { span: 2 },
                      p.createElement('div', { className: h.a.center }, '\u7236\u7ea7\u9875 ', l + 1)
                    ),
                    p.createElement(
                      o.a,
                      { span: 6 },
                      p.createElement(
                        'div',
                        { className: h.a.fatherPage },
                        p.createElement(
                          r.a,
                          {
                            value: e.parentId,
                            onChange: function (t) {
                              return J(k({}, e, { parentId: t, children: [] }), l);
                            }
                          },
                          a.map(function (e) {
                            return p.createElement(
                              D,
                              {
                                disabled: !!t.find(function (t) {
                                  return t.parentId === e.id;
                                }),
                                key: e.id,
                                value: e.id
                              },
                              e.customName || e.metadataName
                            );
                          })
                        ),
                        p.createElement('strong', null, '\u4e0b\u6e38\u9875\u9762:'),
                        p.createElement(
                          'span',
                          { className: h.a.pathString },
                          e.children
                            .filter(function (e) {
                              return !!A[e.id];
                            })
                            .map(function (e) {
                              return A[e.id].customName || A[e.id].metadataName;
                            })
                            .join(',')
                        )
                      )
                    ),
                    p.createElement(
                      o.a,
                      { span: 4 },
                      e.parentId &&
                        p.createElement(
                          u.a,
                          {
                            size: 'default',
                            onClick: function () {
                              return (function (e) {
                                d(!0), C(t[e]), N(e);
                              })(l);
                            }
                          },
                          '\u7f16\u8f91\u4e0b\u6e38\u9875\u9762'
                        ),
                      '\xa0',
                      t.length > 1 &&
                        p.createElement(
                          u.a,
                          {
                            size: 'small',
                            onClick: function () {
                              return (function (e) {
                                var a = JSON.parse(JSON.stringify(t));
                                a.splice(e, 1), n(a);
                              })(l);
                            }
                          },
                          '\u5220\u9664'
                        )
                    )
                  )
                );
              })
            ),
            p.createElement(
              'a',
              {
                onClick: function () {
                  var e = JSON.parse(JSON.stringify(t));
                  e.push({ parentId: null, key: Object(S.a)(), children: [] }), n(e);
                }
              },
              '\u6dfb\u52a0\u7236\u7ea7\u9875'
            )
          );
        },
        A = a(1052),
        L = a(20),
        I = a(68),
        V = a(65),
        T = a(6),
        q = a(482);
      function x(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, n);
        }
        return a;
      }
      function B(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? x(a, !0).forEach(function (t) {
                Object(n.a)(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : x(a).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
              });
        }
        return e;
      }
      var M = r.a.Option,
        G = (l.a.Panel, i.a.Group);
      t.default = Object(I.c)(
        function (e) {
          var t = e.metadata.fieldList,
            a = e.project.projectInfo.id,
            n = e.analyse;
          return {
            fieldList: t,
            projectId: a,
            pathAnalyseData: n.pathAnalyseData,
            pathAnalyseParam: n.pathAnalyseParam,
            analyseLoading: n.analyseLoading
          };
        },
        function (e) {
          return Object(V.b)(
            {
              onGetPathAnalyseData: function (e) {
                return T.H.request(e);
              }
            },
            e
          );
        }
      )(function (e) {
        var t = e.analyseLoading,
          a = e.fieldList,
          n = e.onGetPathAnalyseData,
          l = e.projectId,
          i = e.pathAnalyseData,
          p = e.pathAnalyseParam,
          f = function (e, t) {
            if (((e.projectId = l), t))
              for (var a in ((e.childPageData = e.childPageData.filter(function (e) {
                return e.parentId !== t.id;
              })),
              e.childPageData))
                e.childPageData[a].children = e.childPageData[a].children.filter(function (e) {
                  return e.id !== t.id;
                });
            n(e);
          };
        return m.a.createElement(
          'div',
          { className: v.a.wrapper },
          m.a.createElement(A.a, { data: B({}, p, { projectId: l }) }),
          m.a.createElement(
            'div',
            { className: v.a.rule },
            m.a.createElement(
              'div',
              { className: v.a.ruleSection },
              m.a.createElement('span', { className: v.a.ruleTitle }, '\u6307\u6807:'),
              m.a.createElement(
                r.a,
                {
                  style: { width: 100 },
                  value: p.indicatorType,
                  onChange: function (e) {
                    return f(B({}, p, { indicatorType: e }));
                  }
                },
                m.a.createElement(M, { value: 'PV' }, '\u603b\u6570'),
                m.a.createElement(M, { value: 'UV' }, ' \u7528\u6237\u6570'),
                m.a.createElement(M, { value: 'APV' }, '\u4eba\u5747\u6b21\u6570'),
                m.a.createElement(M, { value: 'DPV' }, '\u65e5\u5747\u6b21\u6570'),
                m.a.createElement(M, { value: 'DUV' }, '\u65e5\u5747\u7528\u6237\u6570')
              )
            ),
            m.a.createElement(
              'div',
              { className: v.a.ruleSection },
              m.a.createElement('span', { className: v.a.ruleTitle }, '\u7b5b\u9009:'),
              m.a.createElement(P.a, {
                fieldList: a,
                filterInfo: p.filter,
                onChange: function (e) {
                  return f(B({}, p, { filter: e }));
                }
              })
            ),
            m.a.createElement(
              'div',
              { className: v.a.ruleSection },
              m.a.createElement('span', { className: v.a.ruleTitle }, '\u9875\u9762\u6c60:'),
              m.a.createElement(E.a, {
                addText: '+\u6dfb\u52a0\u9875\u9762',
                hasCustomName: !0,
                type: L.EMetadataType.page,
                indicators: p.indicators,
                onChange: function (e, t) {
                  return f(B({}, p, { indicators: e }), t);
                }
              })
            ),
            m.a.createElement(
              'div',
              { className: v.a.ruleSection },
              m.a.createElement('span', { className: v.a.ruleTitle }, '\u7236\u7ea7\u9875:'),
              m.a.createElement(J, {
                fieldList: a,
                indicators: p.indicators,
                childPageData: p.childPageData,
                onChange: function (e) {
                  return f(B({}, p, { childPageData: e }));
                }
              })
            )
          ),
          m.a.createElement(
            'div',
            { className: v.a.preview },
            m.a.createElement(
              c.a,
              null,
              m.a.createElement(
                o.a,
                { span: 14 },
                m.a.createElement(d.a, {
                  onChange: function (e) {
                    return f(B({}, p, {}, e));
                  },
                  value: { dateType: p.dateType, dateEnd: p.dateEnd, dateStart: p.dateStart }
                })
              ),
              m.a.createElement(
                o.a,
                { span: 6, offset: 4 },
                m.a.createElement(G, { compact: !0 }, m.a.createElement(u.a, { icon: 'download' }, '\u5bfc\u51fa'))
              )
            ),
            m.a.createElement(s.a, { spinning: t }, m.a.createElement(q.a, { data: i })),
            m.a.createElement('div', null)
          )
        );
      });
    }
  }
]);
//# sourceMappingURL=10.2682e9d2.chunk.js.map
