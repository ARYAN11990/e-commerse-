import random
from typing import List, Dict, Any, Tuple
from contextvars import ContextVar

# A ContextVar to store the current request's session ID
session_id_var: ContextVar[str] = ContextVar("session_id", default="default-session")

# Outer dict keyed by session_id, inner dict keyed by dashboard_name
_GLOBAL_STATE: Dict[str, Dict[str, dict]] = {}

def get_dashboard_state(dashboard_name: str, generator_func) -> dict:
    session_id = session_id_var.get()
    
    if session_id not in _GLOBAL_STATE:
        _GLOBAL_STATE[session_id] = {}
        
    if dashboard_name not in _GLOBAL_STATE[session_id]:
        _GLOBAL_STATE[session_id][dashboard_name] = generator_func()
        
    return _GLOBAL_STATE[session_id][dashboard_name]

def random_percentage(min_val=1, max_val=99, decimals=2) -> float:
    return round(random.uniform(min_val, max_val), decimals)

def calculate_trend(current: float, previous: float) -> Tuple[str, str, str]:
    if previous == 0:
        if current > 0:
            return "up", "+100%", "up"
        return "neutral", "0%", "neutral"
        
    change = ((current - previous) / previous) * 100
    
    if abs(change) < 0.01:
        return "neutral", "0%", "neutral"
        
    direction = "up" if change > 0 else "down"
    formatted_rate = f"{'+' if change > 0 else ''}{change:.2f}%"
    return direction, formatted_rate, direction

def generate_metric(base_value: float, variance_pct: float = 0.2, is_int: bool = True, format_func=None) -> dict:
    variance = base_value * variance_pct
    current = base_value + random.uniform(-variance, variance)
    previous = base_value + random.uniform(-variance, variance)
    return build_metric_dict(current, previous, is_int, format_func)

def build_metric_dict(current: float, previous: float, is_int: bool = True, format_func=None) -> dict:
    if is_int:
        current = int(current)
        previous = int(previous)
    else:
        current = round(current, 2)
        previous = round(previous, 2)
        
    trend, formatted_rate, _ = calculate_trend(current, previous)
    
    if format_func:
        formatted_value = format_func(current)
    else:
        formatted_value = f"{current:,}" if is_int else f"{current:,.2f}"
    
    return {
        "value": formatted_value,
        "raw_value": current,
        "rate": formatted_rate,
        "trend": trend
    }

def generate_time_series(points: int, min_val: int, max_val: int) -> List[int]:
    return [random.randint(min_val, max_val) for _ in range(points)]

def calculate_progress(current: float, target: float) -> float:
    if target == 0: return 0
    return round(min((current / target) * 100, 100), 2)

def random_price(min_val=10, max_val=2000) -> str:
    return f"${random.uniform(min_val, max_val):.2f}"

def format_currency(val: float) -> str:
    if val >= 1000000:
        return f"${val/1000000:.2f}M"
    elif val >= 1000:
        return f"${val/1000:.2f}K"
    return f"${val:,.2f}"

def format_number(val: float) -> str:
    if val >= 1000000:
        return f"{val/1000000:.2f}M"
    elif val >= 1000:
        return f"{val/1000:.1f}K"
    return f"{val:,.0f}"
