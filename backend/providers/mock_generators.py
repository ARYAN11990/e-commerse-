from utils.mock_data import *
import random

def generate_ai_state():
    # Base Users and Revenue for 12 months
    users_series = generate_time_series(12, 10000, 30000)
    revenue_series = [u * random.uniform(0.5, 0.8) for u in users_series]
    
    prev_users_series = generate_time_series(12, 9000, 28000)
    prev_revenue_series = [u * random.uniform(0.5, 0.8) for u in prev_users_series]
    
    # KPIs (using current month for "Last 30 days" or total)
    # The original dashboard says "Last 30 Days", so we'll use the last item in the series
    users_30 = users_series[-1]
    prev_users_30 = prev_users_series[-1]
    
    revenue_30 = revenue_series[-1]
    prev_revenue_30 = prev_revenue_series[-1]
    
    projects_30 = int(users_30 * random.uniform(1.2, 1.8))
    prev_projects_30 = int(prev_users_30 * random.uniform(1.2, 1.8))
    
    paid_30 = int(users_30 * random.uniform(0.02, 0.08))
    prev_paid_30 = int(prev_users_30 * random.uniform(0.02, 0.08))
    
    u_metric = build_metric_dict(users_30, prev_users_30, True, format_number)
    p_metric = build_metric_dict(projects_30, prev_projects_30, True, format_number)
    r_metric = build_metric_dict(revenue_30, prev_revenue_30, False, format_currency)
    paid_metric = build_metric_dict(paid_30, prev_paid_30, True, format_number)
    
    # Token Usages
    total_tokens = random.uniform(10.0, 20.0) # in millions
    gpt_pct = random.uniform(0.4, 0.6)
    gemini_pct = random.uniform(0.1, 0.3)
    xai_pct = 1.0 - (gpt_pct + gemini_pct)
    
    gpt_used = total_tokens * gpt_pct
    gemini_used = total_tokens * gemini_pct
    xai_used = total_tokens * xai_pct
    
    # User Analytics (Total overall)
    total_users = sum(users_series)
    total_paid = int(total_users * random.uniform(0.03, 0.07))
    total_free = total_users - total_paid
    free_pct = (total_free / total_users) * 100
    paid_pct = (total_paid / total_users) * 100
    
    this_month_change = users_series[-1] - prev_users_series[-1]
    this_year_change = sum(users_series) - sum(prev_users_series)
    
    # Project Analytics
    total_projects = sum(projects_30 for _ in range(12)) # rough estimation
    today_proj = int(projects_30 / 30 * random.uniform(0.8, 1.2))
    yesterday_proj = int(projects_30 / 30 * random.uniform(0.8, 1.2))
    
    return {
        "kpis": [
            {"id": 1, "label": "Users", "value": u_metric["value"], "period": "Last 30 Days", "rate": u_metric["rate"], "trend": u_metric["trend"], "icon": "users"},
            {"id": 2, "label": "Projects", "value": p_metric["value"], "period": "Last 30 Days", "rate": p_metric["rate"], "trend": p_metric["trend"], "icon": "folder"},
            {"id": 3, "label": "Revenue", "value": r_metric["value"], "period": "Last 30 Days", "rate": r_metric["rate"], "trend": r_metric["trend"], "icon": "dollar"},
            {"id": 4, "label": "Paid Users", "value": paid_metric["value"], "period": "Last 30 Days", "rate": paid_metric["rate"], "trend": paid_metric["trend"], "icon": "user_check"}
        ],
        "statistics": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {"name": "Users", "data": users_series},
                {"name": "Revenue", "data": revenue_series}
            ]
        },
        "token_usages": {
            "total": f"{total_tokens:.1f}M",
            "limit": f"{int(total_tokens * 1.5 * 1000)}",
            "chart_series": [round(gpt_pct*100), round(gemini_pct*100), round(xai_pct*100)],
            "platforms": [
                {"name": "GPT", "keys": "2 API keys configured", "used": f"{gpt_used:.1f}M", "icon": "gpt"},
                {"name": "Gemini", "keys": "1 API key configured", "used": f"{gemini_used:.1f}M", "icon": "gemini"},
                {"name": "xAI", "keys": "2 API key configured", "used": f"{xai_used:.1f}M", "icon": "xai"}
            ]
        },
        "user_analytics": {
            "total": format_number(total_users),
            "free": {"value": format_number(total_free), "percentage": f"{free_pct:.0f}%", "label": "of total user"},
            "paid": {"value": format_number(total_paid), "percentage": f"{paid_pct:.0f}%", "label": "of total user"},
            "this_month": {"value": format_number(users_series[-1]), "change": f"{'+' if this_month_change>0 else ''}{format_number(this_month_change)}", "label": "from last month", "trend": "up" if this_month_change > 0 else "down"},
            "this_year": {"value": format_number(sum(users_series)), "change": f"{'+' if this_year_change>0 else ''}{format_number(this_year_change)}", "label": "from last year", "trend": "up" if this_year_change > 0 else "down"}
        },
        "projects_analytics": {
            "total": format_number(total_projects),
            "today": {"value": str(today_proj), "label": "Project created"},
            "yesterday": {"value": str(yesterday_proj), "label": "Project created"},
            "this_month": {"value": format_number(projects_30), "change": f"+{int(projects_30 * 0.1)}", "label": "from last month", "trend": "up"},
            "this_year": {"value": format_number(total_projects), "change": f"+{int(total_projects * 0.1)}", "label": "from last year", "trend": "up"}
        },
        "recent_transactions": _generate_ai_transactions(5)
    }

def _generate_ai_transactions(count=5):
    names = ["John Doe", "Kierra Calzada", "Emerson Warkman", "Chance Phillips", "Terry Geidt"]
    packages = ["Starter - Monthly", "Growth - Yearly", "Premium - Monthly"]
    statuses = ["Active", "Expired"]
    
    res = []
    for i in range(count):
        pkg = random.choice(packages)
        price = "$20.00" if "Starter" in pkg else "$249.00" if "Growth" in pkg else "$199.00"
        res.append({
            "id": i + 1,
            "name": random.choice(names),
            "email": "user@gmail.com",
            "package": pkg,
            "price": price,
            "date": f"{random.randint(1, 28)} Feb, 2029",
            "status": random.choice(statuses)
        })
    return res


def generate_analytics_state():
    # Generate 30 days of visitor data for the bar chart
    visitor_series = generate_time_series(30, 100, 400)
    prev_visitor_series = generate_time_series(30, 90, 380)
    
    # Calculate KPIs from the series
    unique_visitors = sum(visitor_series)
    prev_unique_visitors = sum(prev_visitor_series)
    
    # Total pageviews is roughly 2 to 3 times unique visitors
    pageviews_multiplier = random.uniform(2.0, 3.5)
    total_pageviews = int(unique_visitors * pageviews_multiplier)
    prev_total_pageviews = int(prev_unique_visitors * random.uniform(2.0, 3.5))
    
    # Bounce rate 
    bounce_rate = random.uniform(40.0, 60.0)
    prev_bounce_rate = random.uniform(40.0, 60.0)
    
    # Visit duration (minutes and seconds as a string)
    duration_secs = int(random.uniform(120, 240)) # 2 to 4 minutes
    prev_duration_secs = int(random.uniform(120, 240))
    
    def format_duration(seconds):
        mins = seconds // 60
        secs = seconds % 60
        return f"{mins}m {secs}s"
    
    duration_metric = build_metric_dict(duration_secs, prev_duration_secs, True, format_duration)
    # the trend is naturally up if time increases, which is fine
    
    bounce_metric = build_metric_dict(bounce_rate, prev_bounce_rate, False, lambda x: f"{x:.1f}%")
    # For bounce rate, "down" is usually good, but the calculation function returns "down" as direction, the frontend will style red/green automatically or just use standard
    
    # Active users
    live_users = random.randint(200, 800)
    
    # Channels
    channels = [
        {"id": 1, "source": "Google", "visitors": format_number(unique_visitors * 0.4)},
        {"id": 2, "source": "Facebook", "visitors": format_number(unique_visitors * 0.25)},
        {"id": 3, "source": "Threads", "visitors": format_number(unique_visitors * 0.2)},
        {"id": 4, "source": "Direct", "visitors": format_number(unique_visitors * 0.15)}
    ]
    
    return {
        "kpis": {
            "unique_visitors": build_metric_dict(unique_visitors, prev_unique_visitors, True, format_number),
            "total_pageviews": build_metric_dict(total_pageviews, prev_total_pageviews, True, format_number),
            "bounce_rate": bounce_metric,
            "visit_duration": duration_metric
        },
        "visitor_analytics": {
            "categories": [str(i) for i in range(1, 31)],
            "data": visitor_series
        },
        "top_channels": channels,
        "top_pages": [
            {"id": 1, "source": "tailadmin.com", "pageviews": format_number(total_pageviews * 0.35)},
            {"id": 2, "source": "preview.tailadmin.com", "pageviews": format_number(total_pageviews * 0.25)},
            {"id": 3, "source": "docs.tailadmin.com", "pageviews": format_number(total_pageviews * 0.2)},
            {"id": 4, "source": "tailadmin.com/components", "pageviews": format_number(total_pageviews * 0.1)}
        ],
        "active_users": {
            "live": live_users,
            "avg_daily": format_number(unique_visitors / 30),
            "avg_weekly": format_number((unique_visitors / 30) * 7),
            "avg_monthly": format_number(unique_visitors),
            "categories": ["1", "2", "3", "4", "5", "6", "7", "8"],
            "series": generate_time_series(8, 100, 600)
        },
        "acquisition_channels": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            "series": [
                {"name": "Direct", "data": generate_time_series(8, 20, 70)},
                {"name": "Referral", "data": generate_time_series(8, 10, 40)},
                {"name": "Organic Search", "data": generate_time_series(8, 10, 30)},
                {"name": "Social", "data": generate_time_series(8, 10, 40)}
            ]
        },
        "sessions_by_device": {
            "labels": ["Desktop", "Mobile", "Tablet"],
            # make sure they add up to 100%
            "series": [65, 25, 10]
        },
        "recent_orders": _generate_orders()
    }

def _generate_orders():
    countries = ["us", "gb", "fr", "de", "fi", "be", "in"]
    products = [
        ("TailGrids", "UI Kit"), ("GrayGrids", "Templates"), 
        ("UIdeck", "Templates"), ("FormBold", "SaaS"), 
        ("NextAdmin", "Dashboard"), ("Form Builder", "SaaS"), ("AyroUI", "UI Kit")
    ]
    orders = []
    for i, (prod, cat) in enumerate(products):
        orders.append({
            "id": i + 1,
            "product": prod,
            "category": cat,
            "country": random.choice(countries),
            "cr": "Dashboard",
            "value": f"${random.uniform(500, 15000):,.2f}"
        })
    return orders


def generate_crm_state():
    # Generate time series for Profit 1 and Profit 2
    profit_1_series = generate_time_series(12, 100, 300)
    profit_2_series = generate_time_series(12, 50, 150)
    
    prev_profit_1 = generate_time_series(12, 90, 290)
    prev_profit_2 = generate_time_series(12, 45, 145)
    
    # KPIs from series
    total_profit_1 = sum(profit_1_series) * 1000
    prev_total_profit_1 = sum(prev_profit_1) * 1000
    
    total_profit_2 = sum(profit_2_series) * 1000
    prev_total_profit_2 = sum(prev_profit_2) * 1000
    
    profit_1_metric = build_metric_dict(total_profit_1, prev_total_profit_1, False, format_currency)
    profit_2_metric = build_metric_dict(total_profit_2, prev_total_profit_2, False, format_currency)
    
    # Revenue is sum of profits * multiplier
    revenue = (total_profit_1 + total_profit_2) * random.uniform(1.1, 1.5)
    prev_revenue = (prev_total_profit_1 + prev_total_profit_2) * random.uniform(1.1, 1.5)
    revenue_metric = build_metric_dict(revenue, prev_revenue, False, format_currency)
    
    # Deals
    closed_deals = int(revenue / random.uniform(1000, 5000))
    prev_closed_deals = int(prev_revenue / random.uniform(1000, 5000))
    closed_metric = build_metric_dict(closed_deals, prev_closed_deals, True, format_number)
    
    active_deal = closed_deals * random.uniform(200, 600)
    prev_active_deal = prev_closed_deals * random.uniform(200, 600)
    active_metric = build_metric_dict(active_deal, prev_active_deal, False, format_currency)
    
    # Estimated Revenue
    goal_val = f"${random.randint(50, 150)}"
    marketing_val = revenue * random.uniform(0.4, 0.6)
    sales_val = revenue * random.uniform(0.3, 0.5)
    
    marketing_pct = (marketing_val / (marketing_val + sales_val)) * 100
    sales_pct = (sales_val / (marketing_val + sales_val)) * 100
    
    # Sales Category
    total_products = random.randint(1500, 3500)
    p1 = random.uniform(0.4, 0.6)
    p2 = random.uniform(0.2, 0.4)
    p3 = 1.0 - (p1 + p2)
    
    return {
        "kpis": {
            "active_deal": active_metric,
            "revenue_total": revenue_metric,
            "closed_deals": closed_metric
        },
        "statistics": {
            "profit_1": profit_1_metric,
            "profit_2": profit_2_metric,
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {"name": "Profit 1", "data": profit_1_series},
                {"name": "Profit 2", "data": profit_2_series}
            ]
        },
        "estimated_revenue": {
            "goal_value": goal_val,
            "marketing": {"value": format_currency(marketing_val), "percentage": f"{marketing_pct:.0f}%"},
            "sales": {"value": format_currency(sales_val), "percentage": f"{sales_pct:.0f}%"}
        },
        "sales_category": {
            "total": format_number(total_products),
            "categories": [
                {"label": "Affiliate Program", "percentage": f"{p1*100:.0f}%", "products": f"{int(total_products * p1):,} Products"},
                {"label": "Direct Buy", "percentage": f"{p2*100:.0f}%", "products": f"{int(total_products * p2):,} Products"},
                {"label": "Adsense", "percentage": f"{p3*100:.0f}%", "products": f"{int(total_products * p3):,} Products"},
            ],
            "series": [round(p1*100), round(p2*100), round(p3*100)]
        },
        "upcoming_schedule": _generate_schedule(3),
        "recent_orders": _generate_recent_orders(5)
    }

def _generate_schedule(count=3):
    titles = ["Business Analytics Press", "Business Sprint", "Customer Review Meeting", "Quarterly Sync", "Product Launch Planning"]
    dates = ["Wed, 11 Jan", "Fri, 15 Feb", "Thu, 18 Mar", "Mon, 22 Apr", "Tue, 05 May"]
    times = ["09:20 AM", "10:35 AM", "1:15 PM", "11:00 AM", "02:30 PM"]
    
    res = []
    for i in range(count):
        res.append({
            "id": i + 1,
            "date": random.choice(dates),
            "time": random.choice(times),
            "title": random.choice(titles),
            "desc": f"Exploring the Future of Data-Driven +{random.randint(2, 9)} more"
        })
    return res

def _generate_recent_orders(count=5):
    names = ["John Doe", "Kierra Franci", "Emerson Workman", "Chance Philips", "Terry Geidt"]
    statuses = ["Complete", "Pending", "Canceled"]
    
    orders = []
    for i in range(count):
        orders.append({
            "id": f"DE{random.randint(100000, 999999)}",
            "customer_name": random.choice(names),
            "customer_email": "customer@gmail.com",
            "product": "Software License",
            "value": format_currency(random.uniform(500, 3000)),
            "date": "2024-06-15",
            "status": random.choice(statuses)
        })
    return orders


def generate_ecommerce_state():
    # 1. Generate core time series (12 months)
    revenue_series = generate_time_series(12, 10000, 30000)
    sales_series = generate_time_series(12, 100, 500)
    
    prev_revenue_series = generate_time_series(12, 9000, 28000)
    prev_sales_series = generate_time_series(12, 90, 480)
    
    # 2. Calculate totals for KPI cards
    total_revenue = sum(revenue_series)
    prev_total_revenue = sum(prev_revenue_series)
    
    total_sales = sum(sales_series)
    prev_total_sales = sum(prev_sales_series)
    
    # Derivations that logically match
    avg_order_value = total_revenue / total_sales
    prev_avg_order_value = prev_total_revenue / prev_total_sales
    
    total_profit = total_revenue * random.uniform(0.15, 0.25)
    prev_total_profit = prev_total_revenue * random.uniform(0.15, 0.25)
    
    total_customers = total_sales * random.uniform(0.7, 0.9)
    prev_total_customers = prev_total_sales * random.uniform(0.7, 0.9)
    
    # Monthly Targets for the current month (last item in series)
    current_month_revenue = revenue_series[-1]
    prev_month_revenue = prev_revenue_series[-1]
    
    target_revenue = current_month_revenue * random.uniform(1.0, 1.3)
    target_percentage = calculate_progress(current_month_revenue, target_revenue)
    
    # Today's Revenue (approximate)
    today_revenue = current_month_revenue / 30 * random.uniform(0.8, 1.5)
    prev_today_revenue = prev_month_revenue / 30 * random.uniform(0.8, 1.5)

    return {
        "kpis": {
            "customers": build_metric_dict(total_customers, prev_total_customers, True, format_number),
            "orders": build_metric_dict(total_sales, prev_total_sales, True, format_number),
            "revenue": build_metric_dict(total_revenue, prev_total_revenue, False, format_currency),
            "profit": build_metric_dict(total_profit, prev_total_profit, False, format_currency)
        },
        "monthly_sales": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "data": [int(r / 100) for r in revenue_series]
        },
        "monthly_target": {
            "percentage": target_percentage,
            "target": format_currency(target_revenue),
            "target_trend": "up", # target usually goes up or neutral
            "revenue": format_currency(current_month_revenue),
            "revenue_trend": build_metric_dict(current_month_revenue, prev_month_revenue)["trend"],
            "today": format_currency(today_revenue),
            "today_trend": build_metric_dict(today_revenue, prev_today_revenue)["trend"]
        },
        "statistics": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {
                    "name": "Revenue",
                    "data": [r/1000 for r in revenue_series] # scaled for chart
                },
                {
                    "name": "Sales",
                    "data": sales_series
                }
            ]
        },
        "recent_orders": _generate_ecommerce_transactions(5)
    }

def _generate_ecommerce_transactions(count=5):
    statuses = ["Delivered", "Pending", "Canceled"]
    products = [
        {"name": "Macbook pro 13\"", "cat": "Laptop", "img": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80", "price": 2399},
        {"name": "Apple Watch Ultra", "cat": "Watch", "img": "https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?w=100&q=80", "price": 879},
        {"name": "iPhone 15 Pro Max", "cat": "SmartPhone", "img": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80", "price": 1869},
        {"name": "iPad Pro 3rd Gen", "cat": "Electronics", "img": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&q=80", "price": 1699},
        {"name": "Airpods Pro 2nd Gen", "cat": "Accessories", "img": "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=100&q=80", "price": 240}
    ]
    transactions = []
    for i in range(count):
        p = random.choice(products)
        transactions.append({
            "id": i + 1,
            "productName": p["name"],
            "variants": f"{random.randint(1, 3)} Variants",
            "image": p["img"],
            "category": p["cat"],
            "price": format_currency(p["price"]),
            "status": random.choice(statuses)
        })
    return transactions


def generate_finance_state():
    # 1. Generate Cashflow data (12 months)
    income_series = generate_time_series(12, 10000, 25000)
    expense_series = [int(inc * random.uniform(0.5, 0.85)) for inc in income_series]
    
    prev_income_series = generate_time_series(12, 9000, 24000)
    prev_expense_series = [int(inc * random.uniform(0.5, 0.85)) for inc in prev_income_series]
    
    # 2. Total KPIs
    total_income = sum(income_series)
    total_expense = sum(expense_series)
    total_balance = total_income - total_expense
    
    prev_total_income = sum(prev_income_series)
    prev_total_expense = sum(prev_expense_series)
    prev_total_balance = prev_total_income - prev_total_expense
    
    inc_metric = build_metric_dict(total_income, prev_total_income, False, format_currency)
    exp_metric = build_metric_dict(total_expense, prev_total_expense, False, format_currency)
    bal_metric = build_metric_dict(total_balance, prev_total_balance, False, format_currency)
    
    # Saving rate
    saving_rate = (total_balance / total_income) * 100 if total_income > 0 else 0
    goal_rate = 30.0
    to_go = max(0, goal_rate - saving_rate)
    saving_trend = "up" if saving_rate >= goal_rate else "neutral"
    
    # Spending Categories (must sum to 100)
    p1 = random.randint(20, 35)
    p2 = random.randint(15, 25)
    p3 = random.randint(10, 20)
    p4 = random.randint(5, 15)
    p5 = random.randint(5, 10)
    p6 = 100 - (p1 + p2 + p3 + p4 + p5)
    
    return {
        "balance": {
            "balance": bal_metric["value"].replace("$", ""),
            "trend": bal_metric["trend"],
            "change": bal_metric["rate"],
            "comparison": "than last month",
            "account_number": f"**** **** **** {random.randint(1000, 9999)}",
            "sparkline": [int(inc - exp) for inc, exp in zip(income_series, expense_series)]
        },
        "metrics": [
            {"id": 1, "label": "Total Balance", "value": bal_metric["value"], "change": bal_metric["rate"], "trend": bal_metric["trend"], "comparison": "than last month", "icon": "wallet", "color": "#3C50E0"},
            {"id": 2, "label": "Monthly Income", "value": inc_metric["value"], "change": inc_metric["rate"], "trend": inc_metric["trend"], "comparison": "than last month", "icon": "chart", "color": "#10B981"},
            {"id": 3, "label": "Total Spent", "value": exp_metric["value"], "change": exp_metric["rate"], "trend": exp_metric["trend"], "comparison": "than last month", "icon": "credit_card", "color": "#F59E0B"},
            {"id": 4, "label": "Saving Rate", "value": f"{saving_rate:.1f}%", "change": f"Goal: {goal_rate}% - {to_go:.1f}% to go", "trend": saving_trend, "comparison": "", "icon": "saving", "color": "#F43F5E"}
        ],
        "cashflow": {
            "revenue": inc_metric["value"],
            "change": inc_metric["rate"],
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {"name": "Income", "data": income_series},
                {"name": "Expense", "data": expense_series}
            ]
        },
        "cards": {
            "name": "Musharof Chy",
            "status": "Active",
            "number": f"**** **** **** {random.randint(1000, 9999)}",
            "exp": f"{random.randint(1, 12):02d}/{random.randint(28, 32)}",
            "cvc": f"{random.randint(100, 999)}"
        },
        "spending": {
            "total": exp_metric["value"],
            "categories": [
                {"name": "Activity", "color": "#818CF8", "percentage": p1},
                {"name": "Online Purchases", "color": "#80CAEE", "percentage": p2},
                {"name": "Groceries", "color": "#C4B5FD", "percentage": p3},
                {"name": "Digital Goods", "color": "#F9A8D4", "percentage": p4},
                {"name": "Stationery", "color": "#6EE7B7", "percentage": p5},
                {"name": "Others", "color": "#E2E8F0", "percentage": p6}
            ]
        },
        "quicksend": {
            "users": [
                {"id": 1, "avatar": "avatar1", "name": "User 1"},
                {"id": 2, "avatar": "avatar2", "name": "User 2"},
                {"id": 3, "avatar": "avatar3", "name": "User 3"},
                {"id": 4, "avatar": "avatar4", "name": "User 4"},
                {"id": 5, "avatar": "avatar5", "name": "User 5"},
                {"id": 6, "avatar": "avatar6", "name": "User 6"},
                {"id": 7, "avatar": "avatar7", "name": "User 7"}
            ]
        },
        "transaction_list": _generate_finance_transactions(5),
        "recent_transactions": _generate_recent(5)
    }

def _generate_finance_transactions(count=5):
    items = [
        {"title": "Payment Received", "sub": "Cashback from Stellar Rewards", "type": "positive", "icon": "stellar"},
        {"title": "Netflix Subscription", "sub": "September subscription charge", "type": "negative", "icon": "netflix"},
        {"title": "Money received", "sub": "Payment received via PayPal", "type": "positive", "icon": "paypal"},
        {"title": "Google Ads", "sub": "Payment received from google ads", "type": "positive", "icon": "google"}
    ]
    res = []
    for i in range(count):
        item = random.choice(items)
        amt = format_currency(random.uniform(10, 500))
        amt_str = f"+{amt}" if item["type"] == "positive" else f"-{amt}"
        res.append({
            "id": i + 1,
            "title": item["title"],
            "subtitle": item["sub"],
            "amount": amt_str,
            "date": f"Mar {random.randint(1, 28)}",
            "type": item["type"],
            "icon": item["icon"]
        })
    return res

def _generate_recent(count=5):
    activities = ["Hotel Booking", "Online Shopping", "Game Purchase", "Utility Bill Payment", "Online Course Enrollment"]
    statuses = ["Completed", "In Progress"]
    res = []
    for i in range(count):
        res.append({
            "id": i + 1,
            "order_id": f"NIV_{random.randint(100000, 999999)}",
            "activity": random.choice(activities),
            "price": format_currency(random.uniform(50, 15000)),
            "date": f"{random.randint(1, 28)} Feb, 2028 09:15 AM",
            "status": random.choice(statuses)
        })
    return res


def generate_logistics_state():
    # Base shipment metrics
    shipment_series = generate_time_series(12, 40, 90)
    delivery_series = [int(s * random.uniform(0.7, 0.95)) for s in shipment_series]
    
    total_shipment = sum(shipment_series) * 1000
    total_delivery = sum(delivery_series) * 1000
    
    # Previous
    prev_shipment = total_shipment * random.uniform(0.8, 1.2)
    prev_delivery = total_delivery * random.uniform(0.8, 1.2)
    
    # Transit
    in_transit = total_shipment - total_delivery
    prev_transit = prev_shipment - prev_delivery
    
    shipment_metric = build_metric_dict(total_shipment, prev_shipment, True, format_number)
    delivery_metric = build_metric_dict(total_delivery, prev_delivery, True, format_number)
    transit_metric = build_metric_dict(in_transit, prev_transit, True, format_number)
    
    # Revenue
    revenue = total_shipment * random.uniform(20.0, 50.0)
    rev_series = generate_time_series(7, 20, 30)
    
    # Vehicles
    vehicles = random.randint(20, 50)
    prev_vehicles = random.randint(20, 50)
    veh_metric = build_metric_dict(vehicles, prev_vehicles, True)
    
    return {
        "kpis": [
            {"id": 1, "label": "Total Orders", "value": shipment_metric["value"], "rate": shipment_metric["rate"], "trend": shipment_metric["trend"], "icon": "box"},
            {"id": 2, "label": "Orders in Transit", "value": transit_metric["value"], "rate": transit_metric["rate"], "trend": transit_metric["trend"], "icon": "truck"},
            {"id": 3, "label": "Delivered Orders", "value": delivery_metric["value"], "rate": delivery_metric["rate"], "trend": delivery_metric["trend"], "icon": "box_check"}
        ],
        "delivery_statistics": {
            "total_deliveries": format_number(total_delivery),
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {"name": "Shipment", "data": shipment_series},
                {"name": "Delivery", "data": delivery_series}
            ]
        },
        "tracking": {
            "tracking_id": f"#{random.randint(10000, 99999)}-{random.randint(10000, 99999)}",
            "status": "In Transit",
            "timeline": [
                {"id": 1, "date": "12 Apr 2028", "title": "Picked up", "time": "12:54", "icon": "box", "completed": True},
                {"id": 2, "date": "12 Apr 2028", "title": "In Transit", "time": "12:58", "icon": "truck", "completed": True},
                {"id": 3, "date": "13 Apr 2028", "title": "Delivered", "time": "--:--", "icon": "check", "completed": False}
            ],
            "courier": {
                "name": "Devid walthen",
                "avatar": "DW"
            }
        },
        "revenue_earned": {
            "total_revenue": format_currency(revenue),
            "shipped_quantities": format_number(total_shipment),
            "series": [{"name": "Revenue", "data": rev_series}]
        },
        "delivery_vehicles": {
            "value": veh_metric["value"],
            "change": veh_metric["rate"],
            "trend": veh_metric["trend"],
            "status": "On-route"
        },
        "activities": _generate_logistics_activities(5)
    }

def _generate_logistics_activities(count=5):
    categories = ["Furniture", "Clothing", "Books", "Automotive", "Electronics"]
    companies = ["HomeLine", "StylePro", "EduSource", "AutoParts Co.", "TechNova"]
    routes = ["Berlin-Milan", "Paris-Rome", "New York-Chicago", "Tokyo-Osaka", "San Francisco-Seattle"]
    statuses = ["Delivered", "In Transit", "Processing"]
    
    res = []
    for i in range(count):
        res.append({
            "id": f"#{random.randint(300000, 399999)}",
            "category": random.choice(categories),
            "company": random.choice(companies),
            "arrival": "21 May 2028 9:00 am",
            "route": random.choice(routes),
            "price": format_currency(random.uniform(100, 3000)),
            "status": random.choice(statuses)
        })
    return res


def generate_marketing_state():
    # Base generation for traffic and impressions over 3 months
    traffic = generate_time_series(3, 100, 200)
    impressions = [int(t * random.uniform(1.5, 2.5)) for t in traffic]
    
    prev_traffic = generate_time_series(3, 90, 180)
    prev_impressions = [int(t * random.uniform(1.5, 2.5)) for t in prev_traffic]
    
    # KPIs based on time series
    total_traffic = sum(traffic) * 100 # Scaling for realism
    total_impressions = sum(impressions) * 100
    
    total_revenue = total_traffic * random.uniform(0.05, 0.15)
    prev_revenue = sum(prev_traffic) * 100 * random.uniform(0.05, 0.15)
    
    # Revenue trend matching the chart
    rev_metric = build_metric_dict(total_revenue, prev_revenue, False, format_currency)
    
    # Client Rating (out of 10)
    rating = random.uniform(7.0, 9.8)
    prev_rating = random.uniform(7.0, 9.8)
    rating_metric = build_metric_dict(rating, prev_rating, False, lambda x: f"{x:.1f}/10")
    
    # Social stats
    followers = int(total_traffic * random.uniform(0.1, 0.3))
    prev_followers = int(sum(prev_traffic) * 100 * random.uniform(0.1, 0.3))
    followers_metric = build_metric_dict(followers, prev_followers, True, format_number)
    
    # Subscriber stats
    subscribers = total_traffic * random.uniform(0.05, 0.1)
    prev_subscribers = sum(prev_traffic) * 100 * random.uniform(0.05, 0.1)
    subs_metric = build_metric_dict(subscribers, prev_subscribers, True, format_number)
    
    # Conversions
    conversions = total_traffic * random.uniform(0.01, 0.05)
    prev_conversions = sum(prev_traffic) * 100 * random.uniform(0.01, 0.05)
    conv_metric = build_metric_dict(conversions, prev_conversions, True, format_number)
    
    # Bounce Rate
    bounce_rate = random.uniform(20.0, 45.0)
    prev_bounce_rate = random.uniform(20.0, 45.0)
    bounce_metric = build_metric_dict(bounce_rate, prev_bounce_rate, False, lambda x: f"{x:.2f}%")
    
    return {
        "kpis": {
            "avg_client_rating": rating_metric,
            "instagram_followers": followers_metric,
            "total_revenue": rev_metric,
        },
        "impression_traffic": {
            "total_revenue": rev_metric["value"],
            "rate": rev_metric["rate"],
            "date_range": "Oct 1, 2024 - Dec 31, 2024",
            "categories": ["Oct", "Nov", "Dec"],
            "series": [
                {"name": "Traffic", "data": traffic},
                {"name": "Impression", "data": impressions}
            ]
        },
        "traffic_stats": {
            "new_subscribers": subs_metric,
            "conversion_rate": conv_metric,
            "page_bounce_rate": bounce_metric,
        },
        "featured_campaigns": _generate_campaigns(6),
        "top_traffic_source": [
            {"id": 1, "source": "Google", "percentage": f"{random.randint(60, 80)}%"},
            {"id": 2, "source": "Youtube", "percentage": f"{random.randint(40, 59)}%"},
            {"id": 3, "source": "Facebook", "percentage": f"{random.randint(30, 49)}%"},
            {"id": 4, "source": "Instagram", "percentage": f"{random.randint(20, 39)}%"},
        ]
    }

def _generate_campaigns(count=6):
    brands = ["Slack", "Facebook", "Google", "Instagram", "Twitter", "LinkedIn", "TikTok"]
    names = ["Wilson Gouse", "Terry Franci", "Alena Franci", "Jocelyn Kenter", "Brandon Philips", "James Lipshutz"]
    statuses = ["Success", "Pending", "Failed"]
    campaigns = [
        "Grow your brand by...", "Make Better Ideas...", 
        "Increase your website tra...", "Digital Marketing that...", "Self branding"
    ]
    
    results = []
    for i in range(count):
        results.append({
            "id": i + 1,
            "creator": random.choice(names),
            "campaign": random.choice(campaigns),
            "brand": random.choice(brands),
            "status": random.choice(statuses)
        })
    return results


def generate_saas_state():
    # Base user metrics
    users = random.randint(5000, 15000)
    prev_users = int(users * random.uniform(0.8, 1.1))
    users_metric = build_metric_dict(users, prev_users, True, format_number)
    
    # Revenue
    revenue = users * random.uniform(15.0, 30.0)
    prev_revenue = prev_users * random.uniform(15.0, 30.0)
    rev_metric = build_metric_dict(revenue, prev_revenue, False, format_currency)
    
    # CLV
    clv = revenue / users * random.uniform(2.0, 5.0) if users > 0 else 0
    prev_clv = prev_revenue / prev_users * random.uniform(2.0, 5.0) if prev_users > 0 else 0
    clv_metric = build_metric_dict(clv, prev_clv, False, format_currency)
    
    # CAC
    cac = random.uniform(20.0, 50.0)
    prev_cac = cac * random.uniform(0.9, 1.2)
    cac_metric = build_metric_dict(cac, prev_cac, False, format_currency)
    
    # Churn Rate
    churn_series = [random.uniform(3.0, 6.0) for _ in range(6)]
    churn = churn_series[-1]
    prev_churn = churn_series[-2]
    churn_metric = build_metric_dict(churn, prev_churn, False, lambda x: f"{x:.2f}%")
    
    # User growth
    growth_series = generate_time_series(6, 2500, users)
    growth_series.sort()
    growth_metric = build_metric_dict(growth_series[-1], growth_series[-2], True, format_number)
    
    # Product performance
    digital = int(users * random.uniform(0.05, 0.15))
    prev_digital = int(prev_users * random.uniform(0.05, 0.15))
    dig_metric = build_metric_dict(digital, prev_digital, True)
    
    physical = int(users * random.uniform(0.02, 0.08))
    prev_physical = int(prev_users * random.uniform(0.02, 0.08))
    phys_metric = build_metric_dict(physical, prev_physical, True)
    
    daily_sales_series = generate_time_series(7, 100, 300)
    avg_sales = sum(daily_sales_series) / 7
    prev_avg_sales = avg_sales * random.uniform(0.8, 1.2)
    avg_sales_metric = build_metric_dict(avg_sales, prev_avg_sales, False, format_currency)
    
    # Conversion Funnel
    impressions = generate_time_series(8, 50, 100)
    sessions = [int(i * random.uniform(0.4, 0.7)) for i in impressions]
    downloads = [int(s * random.uniform(0.5, 0.8)) for s in sessions]
    new_users = [int(d * random.uniform(0.3, 0.6)) for d in downloads]
    
    return {
        "overview": {
            "revenue": rev_metric,
            "active_users": users_metric,
            "clv": clv_metric,
            "cac": cac_metric
        },
        "churn_rate": {
            "value": f"{churn:.2f}%",
            "change": churn_metric["rate"],
            "trend": churn_metric["trend"],
            "series": [{"name": "Churn", "data": churn_series}]
        },
        "user_growth": {
            "value": format_number(growth_series[-1]),
            "change": growth_metric["rate"],
            "trend": growth_metric["trend"],
            "series": [{"name": "Growth", "data": growth_series}]
        },
        "product_performance": {
            "digital_product": {"value": format_number(digital), "trend": dig_metric["trend"]},
            "physical_product": {"value": format_number(physical), "trend": phys_metric["trend"]},
            "average_daily_sales": {"value": avg_sales_metric["value"], "change": avg_sales_metric["rate"], "trend": avg_sales_metric["trend"]},
            "categories": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "series": [{"name": "Sales", "data": daily_sales_series}]
        },
        "conversion_funnel": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            "series": [
                {"name": "Ad Impression", "data": impressions},
                {"name": "Website Session", "data": sessions},
                {"name": "App Download", "data": downloads},
                {"name": "New Users", "data": new_users}
            ]
        },
        "recent_invoices": _generate_invoices(5),
        "activities": _generate_activities(4)
    }

def _generate_invoices(count=5):
    users = ["Jenny Wilson", "Wade Warren", "Darlene Robertson", "Arlene McCoy", "Bessie Cooper"]
    statuses = ["Complete", "Pending", "Cancelled"]
    res = []
    for i in range(count):
        res.append({
            "id": f"#{random.choice(['DF', 'HTY', 'LKE', 'HRP', 'WRH'])}{random.randint(100, 999)}",
            "date": "April 28, 2016",
            "user": random.choice(users),
            "amount": format_currency(random.uniform(50, 1000)),
            "status": random.choice(statuses)
        })
    return res

def _generate_activities(count=4):
    users = ["Francisco Grbbs", "Courtney Henry", "Bessie Cooper", "Theresa Web"]
    res = []
    for i in range(count):
        res.append({
            "id": i + 1,
            "user": random.choice(users),
            "action": "created invoice",
            "invoice": f"{random.choice(['PQ', 'HK', 'LH', 'CK'])}-{random.randint(1000, 9999)}",
            "time": random.choice(["Just Now", "15 minutes ago", "5 months ago", "2 weeks ago"])
        })
    return res


def generate_sales_state():
    # 1. Base statistics (Online vs Offline Sales)
    online_sales = generate_time_series(12, 10000, 20000)
    offline_sales = generate_time_series(12, 5000, 15000)
    
    total_online = sum(online_sales)
    total_offline = sum(offline_sales)
    
    prev_online_sales = generate_time_series(12, 9000, 19000)
    prev_offline_sales = generate_time_series(12, 4000, 14000)
    
    # KPIs based on the final month
    curr_revenue = online_sales[-1] + offline_sales[-1]
    prev_revenue = prev_online_sales[-1] + prev_offline_sales[-1]
    rev_metric = build_metric_dict(curr_revenue, prev_revenue, False, format_currency)
    
    curr_sales = int(curr_revenue / random.uniform(50, 150))
    prev_sales = int(prev_revenue / random.uniform(50, 150))
    sales_metric = build_metric_dict(curr_sales, prev_sales, True, format_number)
    
    curr_conv = random.uniform(2.0, 5.0)
    prev_conv = random.uniform(2.0, 5.0)
    conv_metric = build_metric_dict(curr_conv, prev_conv, False, lambda x: f"{x:.2f}%")
    
    curr_refund = random.uniform(0.5, 3.0)
    prev_refund = random.uniform(0.5, 3.0)
    refund_metric = build_metric_dict(curr_refund, prev_refund, False, lambda x: f"{x:.2f}%")
    
    # Retention
    retention_series = [random.randint(5, 100) for _ in range(12)]
    retention_series.sort(reverse=True)
    retention = random.uniform(20.0, 40.0)
    prev_retention = random.uniform(20.0, 40.0)
    ret_metric = build_metric_dict(retention, prev_retention, False, lambda x: f"{x:.1f}%")
    
    # Channels
    web = random.randint(30, 50)
    email = random.randint(15, 35)
    social = 100 - (web + email)
    
    channel_metric = build_metric_dict(web + email + social, 95, True, str) # Just an abstract score
    
    # Countries
    countries_data = [
        {"code": "US", "name": "USA", "rev": total_online * random.uniform(0.4, 0.6)},
        {"code": "FR", "name": "France", "rev": total_online * random.uniform(0.1, 0.3)},
        {"code": "JP", "name": "Japan", "rev": total_online * random.uniform(0.05, 0.2)},
        {"code": "DE", "name": "Germany", "rev": total_online * random.uniform(0.05, 0.2)}
    ]
    total_country_rev = sum(c["rev"] for c in countries_data)
    countries = [
        {
            "code": c["code"], 
            "name": c["name"], 
            "revenue": format_currency(c["rev"]), 
            "percentage": f"{(c['rev'] / total_country_rev)*100:.0f}%"
        } 
        for c in countries_data
    ]
    
    return {
        "header": {
            "title": "Sales Dashboard",
            "subtitle": "Track revenue, performance, and sales growth in real-time",
            "date_range": "Aug 10 - Aug 16"
        },
        "kpis": [
            {
                "id": 1, "label": "Total Revenue", "value": rev_metric["value"], "rate": rev_metric["rate"], "trend": rev_metric["trend"], "comparison": "vs last month",
                "icon": "dollar", "color": "#10B981", "series": [{"name": "Revenue", "data": generate_time_series(7, 10, 30)}]
            },
            {
                "id": 2, "label": "Total Sales", "value": sales_metric["value"], "rate": sales_metric["rate"], "trend": sales_metric["trend"], "comparison": "vs last month",
                "icon": "box", "color": "#8B5CF6", "series": [{"name": "Sales", "data": generate_time_series(7, 10, 30)}]
            },
            {
                "id": 3, "label": "Conversion Rate", "value": conv_metric["value"], "rate": conv_metric["rate"], "trend": conv_metric["trend"], "comparison": "vs last month",
                "icon": "arrows", "color": "#3BA2B8", "series": [{"name": "Conv", "data": generate_time_series(7, 10, 30)}]
            },
            {
                "id": 4, "label": "Refund Rate", "value": refund_metric["value"], "rate": refund_metric["rate"], "trend": refund_metric["trend"], "comparison": "vs last month",
                "icon": "money_return", "color": "#EF4444", "series": [{"name": "Refunds", "data": generate_time_series(7, 10, 30)}]
            }
        ],
        "statistics": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "series": [
                {"name": "Online Sales", "data": online_sales},
                {"name": "Offline Sales", "data": offline_sales}
            ]
        },
        "retention": {
            "rate": ret_metric["value"],
            "change": ret_metric["rate"],
            "trend": ret_metric["trend"],
            "comparison": f"{'Increased' if ret_metric['trend'] == 'up' else 'Decreased'} vs last week",
            "series": [{"name": "Cohort", "data": retention_series}],
            "categories": [str(i) for i in range(1, 13)]
        },
        "channel": {
            "value": channel_metric["value"],
            "change": channel_metric["rate"],
            "trend": channel_metric["trend"],
            "comparison": f"{'Increased' if channel_metric['trend'] == 'up' else 'Decreased'} vs last week",
            "channels": [
                {"name": "Website", "metric": str(web), "total_change": f"{random.uniform(-5, 10):.1f}%", "trend": random.choice(["up", "down"]), "color": "#3C50E0"},
                {"name": "Email", "metric": str(email), "total_change": f"{random.uniform(-5, 10):.1f}%", "trend": random.choice(["up", "down"]), "color": "#80CAEE"},
                {"name": "Social Media", "metric": str(social), "total_change": f"{random.uniform(-5, 10):.1f}%", "trend": random.choice(["up", "down"]), "color": "#E2E8F0"}
            ]
        },
        "country": {
            "countries": countries
        },
        "top_products": _generate_sales_products(5)
    }

def _generate_sales_products(count=5):
    names = ["Classic Denim Jacket", "Slim Fit Chinos", "Organic Cotton T-Shirt", "Leather Ankle Boots"]
    images = ["jacket1", "pants1", "shirt1", "boots1"]
    statuses = ["In Stock", "Low Stock"]
    
    res = []
    for i in range(count):
        idx = random.randint(0, len(names)-1)
        sales = random.randint(100, 1000)
        res.append({
            "id": i + 1,
            "name": names[idx],
            "variants": f"{random.randint(2, 6)} Colors",
            "image": images[idx],
            "product_id": names[idx].split()[-1],
            "sales": sales,
            "earnings": format_currency(sales * random.uniform(20.0, 150.0)),
            "stocks": random.randint(10, 200),
            "status": random.choice(statuses)
        })
    return res


def generate_stocks_state():
    # Helper to generate a realistic stock state
    def gen_stock(symbol, name, logo, base_price):
        current_price = base_price * random.uniform(0.9, 1.1)
        prev_price = base_price * random.uniform(0.9, 1.1)
        metric = build_metric_dict(current_price, prev_price, False, format_currency)
        return {
            "symbol": symbol,
            "name": name,
            "logo": logo,
            "price": metric["value"],
            "percentage": metric["rate"],
            "trend": metric["trend"]
        }
    
    symbols = [
        ("AAPL", "Apple, Inc", "apple", 150.0),
        ("PYPL", "Paypal, Inc", "paypal", 60.0),
        ("TSLA", "Tesla, Inc", "tesla", 200.0),
        ("AMZN", "Amazon.com, Inc", "amazon", 130.0),
        ("SPOT", "Spotify.com", "spotify", 160.0),
        ("ABNB", "Airbnb, Inc", "airbnb", 140.0),
        ("ENVT", "Envato, Inc", "envato", 45.0),
        ("QIWI", "qiwi.com, Inc", "qiwi", 10.0),
    ]
    
    stocks_pool = [gen_stock(s, n, l, p) for s, n, l, p in symbols]
    
    # Portfolio performance
    perf_series = [random.uniform(30.0, 40.0) for _ in range(33)]
    
    # Dividends
    div_series = generate_time_series(6, 100, 400)
    
    return {
        "overview": random.sample(stocks_pool, 4),
        "portfolio_performance": {
            "categories": ["Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "2026", "Feb '26", "Mar '26", "Apr '26"],
            "series": [
                {"name": "Performance", "data": perf_series}
            ]
        },
        "dividend": {
            "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "series": [{"name": "Dividend", "data": div_series}]
        },
        "watchlist": random.sample(stocks_pool, 5),
        "trending_stocks": random.sample(stocks_pool, 4),
        "latest_transactions": _generate_stock_transactions(stocks_pool, 5)
    }

def _generate_stock_transactions(stocks_pool, count):
    transactions = []
    statuses = ["Success", "Pending", "Failed"]
    actions = ["Bought", "Sell"]
    
    for i in range(count):
        stock = random.choice(stocks_pool)
        action = random.choice(actions)
        transactions.append({
            "id": i + 1,
            "name": f"{action} {stock['symbol']}",
            "date": "Nov 23, 01:00 PM",
            "price": stock['price'],
            "category": "Technology" if stock['symbol'] in ["AAPL", "TSLA", "AMZN"] else "Finance",
            "status": random.choice(statuses),
            "logo": stock['logo']
        })
    return transactions



